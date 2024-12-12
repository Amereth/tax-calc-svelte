<script lang="ts">
	let { children } = $props()
</script>

<main class="grid h-full place-content-center bg-surface-900">
	<div class="w-96">
		{@render children()}
	</div>
</main>
