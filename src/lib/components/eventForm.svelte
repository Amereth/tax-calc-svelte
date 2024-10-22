<script lang="ts">
	import { CheckIcon } from 'lucide-svelte'
	import MinSizeInput from './minSizeInput.svelte'
	import type { Event } from '$lib/server/schemas/events'
	import EventLabel from './eventLabel.svelte'

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

<form class="flex flex-col gap-2" method="post" action="?/{id ? 'update' : 'insert'}">
	<div class="ml-2">{eventLabel}</div>

	{#if id}
		<input type="hidden" value={id} name="id" />
	{/if}

	<input type="hidden" value={year} name="year" />
	<input type="hidden" value={quarter} name="quarter" />
	<input type="hidden" value={type} name="type" />

	<label class="input input-sm input-bordered flex items-center gap-2">
		сума
		<MinSizeInput value={sum} name="sum" className="ml-auto" />
	</label>

	<label class="input input-sm input-bordered flex items-center gap-2">
		дата
		<input type="date" value={doneDate} name="doneDate" class="ml-auto" />
	</label>

	<label class="input input-sm input-bordered flex items-center gap-2">
		гранична дата
		<input type="date" value={latestDoneDate} name="latestDoneDate" class="ml-auto" />
	</label>

	<div class="flex items-center px-2">
		<EventLabel {doneDate} {latestDoneDate} />

		<button type="submit" class="btn btn-square btn-outline btn-success btn-sm ml-auto">
			<CheckIcon size="16" />
		</button>
	</div>
</form>
