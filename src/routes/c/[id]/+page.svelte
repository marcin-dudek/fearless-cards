<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let id;

  $: id = $page.params.id;

  onMount(() => {
    console.log('id:', $page);
  });
</script>

<h1>Param: {id}</h1>
