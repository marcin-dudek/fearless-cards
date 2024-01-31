<script>
	let inputValue = '';
</script>

<main>
	<input type="text" bind:value={inputValue} />
	<p>Input value: {inputValue}</p>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	input {
		padding: 0.5rem;
		margin-bottom: 1rem;
	}
</style>
