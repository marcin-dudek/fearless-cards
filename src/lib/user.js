import { writable } from "svelte/store";

// @type {username: string, avatar_url: string, id: string}
export const user = writable(null);