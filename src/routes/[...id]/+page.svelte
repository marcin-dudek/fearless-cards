<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Collection from '../../components/Collection.svelte';
  import CreateCollection from '../../components/CreateCollection.svelte';

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
  <div><Collection /></div>
  <div class="col-span-2">
    {#if collection}
      <h1>{collection.name}</h1>
      {#each collection.teams ?? [] as team}
        <p>{team.code}</p>
        <br />
      {/each}
    {:else}
      <CreateCollection />
    {/if}
    <div></div>
  </div>
</div>
