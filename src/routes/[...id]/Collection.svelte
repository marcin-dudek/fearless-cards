<script>
  import { collections } from '$lib/collections';
  import { ClipboardPaste, Copy, Minus, Plus } from 'lucide-svelte';
  export let data = null;
  let text = '';
  let code = '';

  const nameChange = (event) => {
    let idx = $collections.findIndex((c) => c.id == data.id);
    $collections[idx].name = event.target.value;
    // post update
  };

  const pasteTeam = async () => {
    code = await navigator.clipboard.readText();
  };

  const addTeam = () => {
    let t = data.teams ?? [];
    data.teams = [{ code }, ...t];
    code = '';
  };
</script>

{#if data !== null}
  <!-- <input type="text" placeholder="Name" bind:value={data.name} class="input w-full max-w-xs" /> -->
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text">Name:</span>
    </div>
    <input
      type="text"
      placeholder="Type here"
      bind:value={data.name}
      on:change={nameChange}
      class="input w-full max-w-xs"
    />
  </label>

  <div class="divider"></div>

  <div class="join w-full">
    <input
      type="text"
      placeholder="team code"
      class="input input-bordered input-accent join-item w-5/6"
      bind:value={code}
    />
    <button class="btn btn-outline btn-accent join-item w-1/12" on:click={pasteTeam}
      ><ClipboardPaste size={16} /></button
    >
    <button class="btn btn-outline btn-accent join-item w-1/12" on:click={addTeam}><Plus size={16} /></button>
  </div>

  <div class="divider"></div>

  {#each data.teams ?? [] as team}
    <div class="join w-full">
      <input type="text" class="input input-bordered input-accent join-item w-5/6" disabled value={team.code} />
      <button class="btn btn-outline btn-accent join-item w-1/12" on:click={pasteTeam}><Copy size={16} /></button>
      <button class="btn btn-outline btn-accent join-item w-1/12" on:click={addTeam}><Minus size={16} /></button>
    </div>
    <div class="divider"></div>
  {/each}
{/if}

{#if data === null}
  <textarea rows="10" cols="50" placeholder="Paste text here" bind:value={text}></textarea>
{/if}
