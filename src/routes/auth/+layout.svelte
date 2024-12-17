<script lang="ts">
	let { children } = $props()
</script>

<main class="grid grow place-content-center">
	<div class="w-96">
		{@render children()}
	</div>
</main>
