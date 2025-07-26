<script lang="ts">
	import { CheckIcon } from 'lucide-svelte'
	import type { Event } from '$lib/server/schemas/events'
	import EventLabel from './eventLabel.svelte'
	import { formatter } from '$lib/utils/formatter'

	const {
		id,
		year,
		quarter,
		type,
		sum,
		doneDate,
		latestDoneDate,
		eventLabel,
	}: {
		id?: Event['id']
		year: string
		quarter: number
		type: Event['type']
		sum: number
		doneDate?: Event['doneDate']
		latestDoneDate?: Event['latestDoneDate']
		eventLabel: string
	} = $props()
</script>

<form
	class="border-surface flex gap-4 rounded-xl border p-4"
	method="post"
	action="?/{id ? 'update' : 'insert'}"
>
	<div class="flex flex-1 flex-col gap-4">
		{#if id}
			<input type="hidden" value={id} name="id" />
		{/if}

		<input type="hidden" value={year} name="year" />
		<input type="hidden" value={quarter} name="quarter" />
		<input type="hidden" value={type} name="type" />

		<label class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">сума</div>

			<input value={formatter('UAH').format(sum)} name="sum" class="input" />
		</label>

		<label class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">дата</div>

			<input type="date" value={doneDate} name="doneDate" class="input" />
		</label>

		<label class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">гранична дата</div>

			<input
				type="date"
				value={latestDoneDate}
				name="latestDoneDate"
				class="input"
			/>
		</label>
	</div>

	<div class="flex flex-1 flex-col items-end gap-2">
		<div>{eventLabel}</div>

		<EventLabel {doneDate} {latestDoneDate} />

		<button type="submit" class="icon mt-auto">
			<CheckIcon size="16" />
		</button>
	</div>
</form>
