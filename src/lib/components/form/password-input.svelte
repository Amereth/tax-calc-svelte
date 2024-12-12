<script lang="ts">
	import { EyeIcon, EyeClosedIcon } from 'lucide-svelte'
	import type { HTMLInputAttributes } from 'svelte/elements'
	import { fade } from 'svelte/transition'
	import { twMerge } from 'tailwind-merge'

	const { name, class: className }: HTMLInputAttributes = $props()

	let isPasswordVisible = $state(false)

	let inputType = $derived(isPasswordVisible ? 'text' : 'password')
</script>

<div class={twMerge('flex flex-col gap-2', className)}>
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

	<input id="password" type={inputType} {name} class="input" />
</div>
