import { load } from 'cheerio';
import fs from 'fs';
//import request from 'request';

async function extractData(url) {
	// const response = await request(url);
	// const html = await response.text();

	const html = await fs.readFileSync(url, 'utf-8');

	const $ = load(html);
	const table = $('table#filter1');
	const data = [];

	table.find('tr').each(async (index, row) => {
		const rowData = [];
		await row.find('td').each(async (index, cell) => {
			const value = await $(cell).text().trim();
			rowData.push(value);
		});
		data.push(rowData);
	});

	return data;
}

const url = 'https://www.example.com/table.html';

(async () => {
	try {
		const data = await extractData('./data.html');
		console.log(data);
	} catch (error) {
		console.error(error);
	}
})();
