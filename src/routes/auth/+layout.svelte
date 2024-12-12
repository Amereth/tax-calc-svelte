<script lang="ts">
	let { children } = $props()
</script>

<main class="grid h-full place-content-center bg-surface-700">
	<div class="rounded-[3rem] bg-surface-900 p-28">
		{@render children()}
	</div>
</main>
