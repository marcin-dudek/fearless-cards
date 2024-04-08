<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Collection from '../../components/Collection.svelte';

  let id;

  $: id = $page.params.id;

  onMount(() => {
    console.log('id:', $page);
  });
</script>

<div class="grid grid-cols-3 py-6">
  <div><Collection /></div>
  <div><h1>Param: {id}</h1></div>
</div>
