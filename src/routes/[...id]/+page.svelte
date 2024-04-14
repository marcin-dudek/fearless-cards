<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import CollectionList from './CollectionList.svelte';
  import CreateCollection from './CreateCollection.svelte';
  import Collection from './Collection.svelte';

  let collection = null;

  import { user } from '$lib/user';
  export let data;
  $: {
    user.set(data.user);
    collection = data.collection;
  }

  onMount(() => {
    console.log('id:', $page);
  });
</script>

<div class="grid grid-cols-3 py-6 gap-x-6">
  <div><CollectionList /></div>
  <div class="col-span-2">
    {#if collection}
      <Collection data={collection} />
    {:else}
      <CreateCollection />
    {/if}
    <div></div>
  </div>
</div>
