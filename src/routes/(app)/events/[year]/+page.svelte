<script lang="ts">
	import { page } from '$app/state'
	import EventForm from '$lib/components/eventForm.svelte'
	import type { Tax, Event, Payment } from '$lib/server/schemas/types'
	import { getCurrentYearValues } from '$lib/utils/getCurrentYearValues'
	import { getQuarterValues } from '$lib/utils/getQuarterValues'

	let year = $derived(page.params.year)

	let { payments, esvs, eps, military, events } = $derived(page.data) as {
		payments: Payment[]
		esvs: Tax[]
		eps: Tax[]
		military: Tax[]
		events: Event[]
	}
</script>

<div class="grid grid-cols-2 gap-6 xl:grid-cols-4">
	{#each [1, 2, 3, 4] as const as quarter}
		{@const { quarterSum, quarterEsv, quarterEp, quarterMilitary } =
			getQuarterValues({
				quarter,
				payments: getCurrentYearValues(year, payments),
				eps: getCurrentYearValues(year, eps),
				esvs: getCurrentYearValues(year, esvs),
				military: getCurrentYearValues(year, military),
			})}

		{@const [declarationEvent, esvEvent, epEvent, militaryEvent] = events
			.filter((event) => event.quarter === quarter)
			.reduce<
				[
					Event | undefined,
					Event | undefined,
					Event | undefined,
					Event | undefined,
				]
			>(
				(acc, event) => {
					if (event.type === 'declaration') acc[0] = event
					if (event.type === 'esv') acc[1] = event
					if (event.type === 'ep') acc[2] = event
					if (event.type === 'military') acc[3] = event

					return acc
				},
				[undefined, undefined, undefined, undefined],
			)}

		<div class="border-surface flex flex-col gap-8 rounded-xl border p-4">
			<div class="mr-4 text-right">{quarter} квартал {year}</div>

			<EventForm
				id={declarationEvent?.id}
				{year}
				{quarter}
				sum={declarationEvent?.sum || quarterSum}
				doneDate={declarationEvent?.doneDate}
				latestDoneDate={declarationEvent?.latestDoneDate}
				type="declaration"
				eventLabel="декларація"
			/>

			<EventForm
				id={esvEvent?.id}
				{year}
				{quarter}
				sum={esvEvent?.sum || quarterEsv}
				doneDate={esvEvent?.doneDate}
				latestDoneDate={esvEvent?.latestDoneDate}
				type="esv"
				eventLabel="ЄСВ"
			/>

			<EventForm
				id={epEvent?.id}
				{year}
				{quarter}
				sum={epEvent?.sum || quarterEp}
				doneDate={epEvent?.doneDate}
				latestDoneDate={epEvent?.latestDoneDate}
				type="ep"
				eventLabel="ЄП"
			/>

			<EventForm
				id={militaryEvent?.id}
				{year}
				{quarter}
				sum={militaryEvent?.sum || quarterMilitary}
				doneDate={militaryEvent?.doneDate}
				latestDoneDate={militaryEvent?.latestDoneDate}
				type="military"
				eventLabel="Військовий податок"
			/>
		</div>
	{/each}
</div>
