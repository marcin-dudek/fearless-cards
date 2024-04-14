<script>
  import { collections } from '$lib/collections';
  export let data = null;
  let text = '';

  const nameChange = (event) => {
    let idx = $collections.findIndex((c) => c.id == data.id);
    $collections[idx].name = event.target.value;
    // post update
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

  {#each data.teams ?? [] as team}
    <p>{team.code}</p>
    <br />
  {/each}
{/if}

{#if data === null}
  <textarea rows="10" cols="50" placeholder="Paste text here" bind:value={text}></textarea>
{/if}
