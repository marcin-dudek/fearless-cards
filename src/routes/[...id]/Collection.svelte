<script>
  export let data = null;
</script>

{#if data != null}
  <h1>{data.name}</h1>
  {#each data.teams ?? [] as team}
    <p>{team.code}</p>
    <br />
  {/each}
{/if}
