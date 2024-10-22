<script lang="ts">
	import type { Event } from '$lib/server/schemas/events'
	import { date, dayEnd, diffDays, sameDay } from '@formkit/tempo'
	import { CheckIcon, CircleAlert } from 'lucide-svelte'

	const {
		doneDate,
		latestDoneDate: _latestDoneDate,
	}: {
		doneDate?: Event['doneDate']
		latestDoneDate: Event['latestDoneDate'] | undefined
	} = $props()

	const latestDoneDate = $derived(_latestDoneDate && date(_latestDoneDate))

	const now = new Date()

	const isLastDayToday = $derived(latestDoneDate && sameDay(now, latestDoneDate))

	const isTooLate = $derived(latestDoneDate && dayEnd(now) > dayEnd(latestDoneDate))

	const diffInDays = $derived(latestDoneDate && diffDays(dayEnd(latestDoneDate), dayEnd(now)))
</script>

{#if !latestDoneDate}
	<!-- nothing -->
{:else if doneDate}
	<div class="flex gap-2 text-success">
		<CheckIcon size="24" />
		<span>done</span>
	</div>
{:else if isLastDayToday}
	<div class="flex gap-2 text-orange-500">
		<CircleAlert size="24" />
		<span>today is last day</span>
	</div>
{:else if isTooLate}
	<div class="flex gap-2 text-red-500">
		<CircleAlert size="24" />
		<span>too late</span>
	</div>
{:else if diffInDays && diffInDays <= 14}
	<div class="flex gap-2 text-yellow-300">
		<CircleAlert size="24" />
		<span>{diffInDays} days left</span>
	</div>
{/if}
