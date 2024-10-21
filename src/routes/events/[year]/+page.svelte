<script lang="ts">
	import { page } from '$app/stores'
	import EventForm from '$lib/components/eventForm.svelte'
	import type { Ep } from '$lib/server/schemas/ep'
	import type { Esv } from '$lib/server/schemas/esv'
	import type { Payment } from '$lib/server/schemas/payments'
	import { getCurrentYearValues } from '../../../utils/getCurrentYearValues'
	import { getQuarterValues } from '../../../utils/getQuarterValues'

	let year = $derived($page.params.year)

	let { payments, esvs, eps } = $derived($page.data) as {
		payments: Payment[]
		esvs: Esv[]
		eps: Ep[]
	}
</script>

<div class="grid grid-cols-2 gap-6 xl:grid-cols-4">
	{#each [1, 2, 3, 4] as const as quarter}
		{@const { quarterSum, quarterEsv, quarterEp } = getQuarterValues({
			quarter,
			payments: getCurrentYearValues(year, payments),
			eps: getCurrentYearValues(year, eps),
			esvs: getCurrentYearValues(year, esvs),
		})}
		<div class="flex flex-col gap-4 rounded-xl border-[1px] border-primary p-4">
			<div class="mr-4 text-right">{quarter} квартал {year}</div>

			<EventForm {year} {quarter} type="declaration" sum={quarterSum} eventLabel="декларація" />

			<EventForm {year} {quarter} type="esv" sum={quarterEsv} eventLabel="ЄСВ" />

			<EventForm {year} {quarter} type="ep" sum={quarterEp} eventLabel="ЄП" />
		</div>
	{/each}
</div>
