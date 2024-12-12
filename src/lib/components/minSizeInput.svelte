<script lang="ts">
	let {
		value,
		name,
		className,
	}: { value?: number; name: string; className?: string } = $props()
</script>

<input
	bind:value
	{name}
	class={className}
	style:width={value?.toString().length + 'ch'}
	type="text"
/>
