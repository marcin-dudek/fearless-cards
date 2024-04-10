<script>
  import { collections } from '$lib/collections';
  import { user } from '$lib/user';
  let data = { name: '', is_public: false };

  let crete = () => {
    fetch('/api/collections', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => collections.set(data));
  };
</script>

<div class="card bg-base-200 shadow-xl">
  <div class="card-body items-center text-center">
    <!-- <h2 class="card-title">Create collection</h2> -->
    <input
      type="text"
      placeholder="Collection name"
      class="input input-bordered w-full max-w-xs"
      bind:value={data.name}
    />

    <label class="label cursor-pointer w-32">
      <span class="label-text">Public</span>
      <input type="checkbox" class="checkbox" bind:checked={data.is_public} />
    </label>

    <br />
    <div class="card-actions justify-center">
      {#if $user === null}
        <div class="tooltip tooltip-error" data-tip="Login to create collection">
          <button class="btn btn-primary" disabled>Create</button>
        </div>
      {:else}
        <button class="btn btn-primary" on:click={crete}>Create</button>
      {/if}
    </div>
  </div>
</div>
