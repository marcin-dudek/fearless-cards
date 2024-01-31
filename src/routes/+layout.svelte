<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { AppBar, AppRailAnchor, AppRail, AppShell } from '@skeletonlabs/skeleton';
	import Collections from './collections.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<span class="icon-[mdi--home]" style="font-size: 24px;" />
			</svelte:fragment>
			Teams Library
			<svelte:fragment slot="trail">(actions)</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Collections />
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
