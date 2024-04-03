<script>
	import { user } from '$lib/user';
	import { LogIn } from 'lucide-svelte';
</script>

<div class="dropdown dropdown-end">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	{#if user === null}
		<div tabindex="0" role="button" class="btn btn-ghost rounded avatar">
			<div class="w-10 rounded-full">
				<LogIn size={36} />
			</div>
		</div>
		<ul
			tabindex="0"
			class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
		>
			<li><a href="/login/github"> Github</a></li>
			<li><a href="/login/discord"> Discord</a></li>
		</ul>
	{:else}
		<div tabindex="0" role="button" class="btn btn-ghost rounded avatar">
			<div class="w-10 rounded-full">
				<img src={user.avatar_url} />
			</div>
		</div>
		<ul
			tabindex="0"
			class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
		>
			<li><a href="/logout">Logout</a></li>
		</ul>
	{/if}
</div>
