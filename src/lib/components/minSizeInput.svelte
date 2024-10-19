<script lang="ts">
	const {
		value: _value,
		name,
		className,
	}: { value?: number; name: string; className?: string } = $props()

	let value = $state(_value)
</script>

<input
	bind:value
	{name}
	class={className}
	style:width={value?.toString().length + 'ch'}
	type="text"
/>
