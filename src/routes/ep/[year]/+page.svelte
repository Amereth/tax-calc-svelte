<script lang="ts">
	import { MONTHS } from '$lib/constants/month'
	import TaxMonth from '$lib/components/taxMonth.svelte'
	import { page } from '$app/stores'
	import type { Ep } from '$lib/server/schemas/ep'

	const { eps } = $page.data as { eps: Ep[] }
	const year = $derived($page.params.year)

	const getValue = (month: number) =>
		eps.find((ep) => {
			const [epYear, epMonth] = ep.date.split('-').map(Number)

			if (epYear === +year && epMonth === month + 1) return true
			return false
		})
</script>

<div class="flex flex-col items-center gap-2">
	{#each MONTHS as month, index}
		<TaxMonth
			date={`${year}-${(index + 1).toString().padStart(2, '0')}`}
			value={getValue(index)?.value}
		/>
	{/each}
</div>
