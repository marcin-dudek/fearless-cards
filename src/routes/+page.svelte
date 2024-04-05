<script>
  import { FolderLock, FolderOpen } from 'lucide-svelte';
  import { onMount } from 'svelte';
  let collections = [];
  onMount(() => {
    fetch('/api/collections')
      .then((res) => res.json())
      .then((data) => (collections = data));
  });
</script>

<div class="p-4">Hello!</div>

<div class="justify-start">
  <h1 class="text-2xl">Collections</h1>
</div>
<ul class="menu w-80 min-h-full text-base-content">
  {#each collections as item}
    <div class="join w-full pb-6">
      <a href="/c/{item.id}" class="btn btn-outline btn-primary join-item w-3/4">{item.name}</a>
      {#if item.public}
        <button class="btn btn-outline btn-primary join-item w-1/4"><FolderOpen size={16} /></button>
      {:else}
        <button class="btn btn-outline btn-primary join-item w-1/4"><FolderLock size={16} /></button>
      {/if}
    </div>
  {/each}
</ul>
