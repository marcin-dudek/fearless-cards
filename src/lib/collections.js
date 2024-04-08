import { writable } from 'svelte/store';

// @type []{id: string, name: string, public: boolean}
export const collections = writable(null);
