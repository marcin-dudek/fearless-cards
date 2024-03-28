package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/fs"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

var (
	dataFile    = "./data/data.html"
	url         = "https://www.taransworld.com/?gowid=list"
	classesFile = "./data/classes.json"
	bannersFile = "./data/banners.json"
	troopsFile  = "./data/troops.json"
)

func main() {
	if !checkFileExists(dataFile) {
		fmt.Println("Requesting live data ...")
		err := requestData()
		if err != nil {
			log.Fatal(err)
			return
		}
	}

	fmt.Println("Parsing file...")
	classes, banners, troops, err := parseData()
	if err != nil {
		log.Fatal(err)
		return
	}

	fmt.Printf("Classes: %d\n.", len(classes))
	saveToFile(classes, classesFile)
	fmt.Printf("Banners: %d\n.", len(banners))
	saveToFile(banners, bannersFile)
	fmt.Printf("Troops: %d\n.", len(troops))
	saveToFile(troops, troopsFile)
	fmt.Println("Done.")
}

func checkFileExists(filePath string) bool {
	_, err := os.Stat(filePath)
	if err != nil && os.IsNotExist(err) {
		return false
	}
	return true
}

func requestData() error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(io.Reader(resp.Body))
	if err != nil {
		return err
	}

	f, err := os.Create(dataFile)
	if err != nil {
		return err
	}
	defer f.Close()

	_, err = f.Write(body)
	if err != nil {
		return err
	}

	return nil
}

func parseData() ([]class, []banner, []troop, error) {
	file, err := os.Open(dataFile)
	if err != nil {
		return nil, nil, nil, err
	}
	defer file.Close()

	doc, err := goquery.NewDocumentFromReader(file)
	if err != nil {
		return nil, nil, nil, err
	}

	var classes []class
	var banners []banner
	var troops []troop
	doc.Find("#filter1").Each(func(tableIndex int, tableHtml *goquery.Selection) {
		tableHtml.Find("tr").Each(func(rowIndex int, rowHtml *goquery.Selection) {
			var id int64
			var kind, name, kingdom, rarity string
			var color []string
			rowHtml.Find("td").Each(func(cellIndex int, cellHtml *goquery.Selection) {
				switch cellIndex {
				case 0:
					kind = cellHtml.Text()
				case 1:
					s := cellHtml.Find("span").Text()
					id, _ = strconv.ParseInt(s, 10, 32)
					name = strings.TrimSuffix(cellHtml.Text(), s)
				case 2:
					s := cellHtml.Find("span").Text()
					kingdom = strings.TrimSuffix(cellHtml.Text(), s)
				case 3:
					rarity = cellHtml.Text()
				case 5:
					color = strings.Split(strings.ReplaceAll(cellHtml.Text(), " ", ""), ",")
				}
			})
			switch kind {
			case "Class":
				classes = append(classes, class{id, name, kingdom})
			case "Kingdom":
				banners = append(banners, banner{id, name})
			case "Troop":
				troops = append(troops, troop{id, name, kingdom, rarity, color})
			}
		})
	})
	return classes, banners, troops, nil
}

func saveToFile[X banner | class | troop](data []X, filename string) {
	jsonData, err := json.Marshal(data)
	if err != nil {
		panic(err)
	}

	os.WriteFile(filename, jsonData, fs.FileMode(0644))
}

type banner struct {
	Id   int64  `json:"id"`
	Name string `json:"name"`
}

type class struct {
	Id      int64  `json:"id"`
	Name    string `json:"name"`
	Kingdom string `json:"kingdom"`
}

type troop struct {
	Id      int64    `json:"id"`
	Name    string   `json:"name"`
	Kingdom string   `json:"kingdom"`
	Rarity  string   `json:"rarity"`
	Color   []string `json:"color"`
}
