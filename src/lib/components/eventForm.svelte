<script lang="ts">
	import { CheckIcon, XIcon } from 'lucide-svelte'
	import MinSizeInput from './minSizeInput.svelte'
	import type { Event } from '$lib/server/schemas/events'

	const {
		year,
		quarter,
		eventType,
		eventLabel,
		taxValue,
	}: {
		year: String
		quarter: number
		eventType: Event['type']
		eventLabel: string
		taxValue: number
	} = $props()
</script>

<form class="flex flex-col gap-2">
	<div>{eventLabel}</div>

	<input type="hidden" value={year} name="year" />
	<input type="hidden" value={quarter} name="quarter" />
	<input type="hidden" value={eventType} name="eventType" />

	<label class="input input-sm input-bordered flex items-center gap-2">
		сума
		<MinSizeInput value={taxValue} name="sum" className="ml-auto" />
	</label>

	<label class="input input-sm input-bordered flex items-center gap-2">
		дата
		<input type="date" name="payDate" class="ml-auto" />
	</label>

	<label class="input input-sm input-bordered flex items-center gap-2">
		гранична дата
		<input type="date" name="latestPayDate" class="ml-auto" />
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
