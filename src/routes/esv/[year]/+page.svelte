<script lang="ts">
	import { MONTHS } from '$lib/constants/month'
	import type { Esv } from '$lib/server/schemas/esv'
	import TaxMonth from '$lib/components/taxMonth.svelte'
	import { page } from '$app/stores'

	const { esv } = $page.data as { esv: Esv[] }
	const year = $derived($page.params.year)

	const getValue = (month: number) =>
		esv.find((esv) => {
			const [esvYear, esvMonth] = esv.date.split('-').map(Number)

			if (esvYear === +year && esvMonth === month + 1) return true
			return false
		})
</script>

<div class="flex flex-col items-center gap-2">
	{#each MONTHS as month, index}
		<TaxMonth
			date="{year}-{(index + 1).toString().padStart(2, '0')}"
			value={getValue(index)?.value}
		/>
	{/each}
</div>
