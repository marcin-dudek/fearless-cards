import { writable } from 'svelte/store';
// import { classes, troops, banners } from './data';

// Retrieve the collections from local storage if available
let initialCollections: string[] = [];
if (typeof localStorage !== 'undefined') {
	const storedCollections = localStorage.getItem('collections');
	initialCollections = storedCollections ? JSON.parse(storedCollections) : [];
}

// Create the writable store for collections
export const collections = writable<string[]>(initialCollections);

// Subscribe to changes in the collections store and update local storage
collections.subscribe((value) => {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('collections', JSON.stringify(value));
	}
});
