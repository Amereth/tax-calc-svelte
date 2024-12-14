<script lang="ts">
	import { EyeIcon, EyeClosedIcon } from 'lucide-svelte'
	import type { HTMLInputAttributes } from 'svelte/elements'
	import { fade } from 'svelte/transition'
	import { twMerge } from 'tailwind-merge'

	let {
		value = $bindable(),
		errors,
		class: className,
		...props
	}: HTMLInputAttributes & {
		errors?: string[]
	} = $props()

	let isPasswordVisible = $state(false)

	let inputType = $derived(isPasswordVisible ? 'text' : 'password')
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between">
		<label class="label" for="password">password</label>

		<button
			type="button"
			class="relative h-6 w-6"
			onclick={() => (isPasswordVisible = !isPasswordVisible)}
		>
			{#if isPasswordVisible}
				<div transition:fade={{ duration: 150 }}>
					<EyeIcon class="absolute left-0 top-0" />
				</div>
			{:else}
				<div transition:fade={{ duration: 150 }}>
					<EyeClosedIcon class="absolute left-0 top-0" />
				</div>
			{/if}
		</button>
	</div>

	<input
		id="password"
		type={inputType}
		class={twMerge('input', className)}
		bind:value
		{...props}
	/>

	{#if errors?.length}
		<div class="flex flex-col gap-1">
			{#each errors as error}
				<span>{error}</span>
			{/each}
		</div>
	{/if}
</div>
