<script lang="ts">
	import { collections } from '../state';
	import { page } from '$app/stores';

	const addItem = () => {
		console.log('added ');
		collections.update((items) => [...items, `Item ${items.length + 1}`]);
		console.log('added ', $collections);
	};
	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
	console.log($page.url.pathname);
</script>

<nav class="list-nav">
	<ul>
		<li>
			<button on:click={addItem}>
				<span
					class="badge bg-primary-500 icon-[mdi--file-document-plus]"
					style="font-size: 24px;"
				/>
				<span class="flex-auto">Add</span>
			</button>
		</li>
		<li>
			{#each $collections as item}
				<a href="/c/{item}" class={classesActive('/c/' + { item })}>
					<span class="badge bg-primary-500 icon-[mdi--fleur-de-lis]" style="font-size: 24px;" />
					<span class="flex-auto">{item}</span>
				</a>
			{/each}
		</li>
	</ul>
</nav>
