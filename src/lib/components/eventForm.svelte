<script lang="ts">
	import { CheckIcon, XIcon } from 'lucide-svelte'
	import MinSizeInput from './minSizeInput.svelte'
	import type { Event } from '$lib/server/schemas/events'

	const {
		eventId,
		year,
		quarter,
		type,
		eventLabel,
		sum,
	}: {
		eventId?: Event['id']
		year: String
		quarter: number
		type: Event['type']
		eventLabel: string
		sum: number
	} = $props()
</script>

<form class="flex flex-col gap-2" method="post" action="?/{eventId ? 'update' : 'insert'}">
	<div>{eventLabel}</div>

	{#if eventId}
		<input type="hidden" value={eventId} name="id" />
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
		<input type="date" name="doneDate" class="ml-auto" />
	</label>

	<label class="input input-sm input-bordered flex items-center gap-2">
		гранична дата
		<input type="date" name="latestDoneDate" class="ml-auto" />
	</label>

	<div class="ml-auto mr-2">
		<button type="submit" class="btn btn-square btn-sm">
			<CheckIcon size="16" />
		</button>

		<button type="reset" class="btn btn-square btn-sm">
			<XIcon size="16" />
		</button>
	</div>
</form>
