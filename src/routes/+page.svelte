<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	/** @type {import('./$types').LayoutData} */
	export let data;

	// Create a store and update it when necessary...
	const user = writable();
	$: user.set(data.user);

	// ...and add it to the context for child components to access
	setContext('user', user);
</script>

<h2 class="text-4xl font-bold">Under development</h2>

<div class="p-4"></div>
{#if data.user?.username}
	<div class="divider"></div>
	<p>{data.user.username}</p>
{/if}

<p>{data.user?.username ?? ''}</p>
