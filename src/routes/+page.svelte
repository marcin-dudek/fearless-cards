<script>
	import { setContext } from 'svelte';
	import { user } from '$lib/user';

	/** @type {import('./$types').LayoutData} */
	export let data;

	$: user.set(data.user);

	// ...and add it to the context for child components to access
	setContext('user', user);
</script>

<div class="p-4"></div>
{#if data?.user !== null}
	<div class="divider"></div>
	<p>{data.user.username}</p>
{/if}
