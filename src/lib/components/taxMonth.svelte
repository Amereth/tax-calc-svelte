<script lang="ts">
	import { MONTHS } from '$lib/constants/month'
	import type { Tax } from '$lib/server/schemas/types'
	import { PenIcon, CheckIcon, XIcon } from 'lucide-svelte'

	let isEdited = $state(false)

	const {
		id,
		date,
		sum,
		type,
	}: {
		id: Tax['id']
		date: string
		sum?: Tax['sum']
		type: Tax['type']
	} = $props()

	const month = $derived(+date.split('-')[1])
</script>

<form
	class="flex items-center gap-8 border-b-[1px] py-2 text-xl"
	method="post"
	action={id ? '?/update' : '?/insert'}
>
	<div class="w-40">{MONTHS[month - 1]}</div>

	{#if isEdited}
		<input type="hidden" name="date" value={date} />
		<input type="hidden" name="type" value={type} />
		<input type="hidden" name="id" value={id} />

		<input
			name="sum"
			value={sum}
			class="d-input d-input-sm d-input-bordered d-input-primary w-40 text-center text-xl"
		/>

		<div>
			<button class="d-btn d-btn-square d-btn-sm" type="submit">
				<CheckIcon size="16" />
			</button>
			<button
				class="d-btn d-btn-square d-btn-sm"
				type="reset"
				onclick={() => (isEdited = false)}
			>
				<XIcon size="16" />
			</button>
		</div>
	{:else}
		<div class="w-40 text-center">{sum}</div>
		<button
			type="button"
			class="d-btn d-btn-square d-btn-sm ml-9"
			onclick={() => (isEdited = true)}
		>
			<PenIcon size="16" />
		</button>
	{/if}
</form>
