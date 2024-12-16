<script lang="ts">
	let { children } = $props()
</script>

<main class="grid h-full place-content-center">
	<div class="w-96">
		{@render children()}
	</div>
</main>
