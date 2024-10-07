<script lang="ts">
	import { MONTHS } from '$lib/constants/month'
	import { PenIcon, CheckIcon, XIcon } from 'lucide-svelte'

	let isEdited = $state(false)

	const { date, value }: { date: string; value?: number } = $props()

	const month = $derived(+date.split('-')[1])
</script>

<form class="flex items-center gap-8 border-b-[1px] py-2 text-xl" method="post">
	<div class="w-40">{MONTHS[month - 1]}</div>

	{#if isEdited}
		<input
			name="value"
			{value}
			class="input input-sm input-bordered input-primary w-40 text-center text-xl"
		/>
		<input name="date" value={date} type="hidden" />
		<input name="isUpdate" value={value ? 1 : ''} type="hidden" />
		<div>
			<button class="btn btn-square btn-sm" type="submit">
				<CheckIcon size="16" />
			</button>
			<button class="btn btn-square btn-sm" type="reset" onclick={() => (isEdited = false)}>
				<XIcon size="16" />
			</button>
		</div>
	{:else}
		<div class="w-40 text-center">{value}</div>
		<button type="button" class="btn btn-square btn-sm ml-9" onclick={() => (isEdited = true)}>
			<PenIcon size="16" />
		</button>
	{/if}
</form>
