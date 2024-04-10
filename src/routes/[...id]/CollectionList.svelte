<script>
  import { FolderLock, FolderOpen } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { collections } from '$lib/collections';

  onMount(() => {
    if ($collections === null) {
      fetch('/api/collections')
        .then((res) => res.json())
        .then((data) => collections.set(data));
    }
  });
</script>

<ul class="menu min-h-full text-base-content">
  <div class="join w-full pb-6">
    <a href="/c" class="btn btn-outline btn-primary join-item w-full">New</a>
  </div>
  {#each $collections ?? [] as item}
    <div class="join w-full pb-6">
      <a href="/c/{item.id}" class="btn btn-outline btn-primary join-item w-5/6">{item.name}</a>
      {#if item.is_public}
        <button class="btn btn-outline btn-primary join-item w-1/6"><FolderOpen size={16} /></button>
      {:else}
        <button class="btn btn-outline btn-primary join-item w-1/6"><FolderLock size={16} /></button>
      {/if}
    </div>
  {/each}
</ul>
