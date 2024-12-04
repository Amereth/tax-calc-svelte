<script lang="ts">
	import { page } from '$app/stores'
	import TaxMonth from '$lib/components/taxMonth.svelte'
	import { MONTHS } from '$lib/constants/month'
	import type { Tax } from '$lib/server/schemas/tax'

	const { taxes } = $derived($page.data) as { taxes: Tax[] }

	const year = $derived($page.params.year)
</script>

<div class="flex flex-col items-center gap-2">
	{#each MONTHS as month, index}
		{@const tax = taxes.find((tax) => {
			const [taxYear, taxMonth] = tax.date.split('-').map(Number)

			if (taxYear === +year && taxMonth === index + 1) return true
			return false
		})}

		{#if tax}
			<TaxMonth
				date="{year}-{(index + 1).toString().padStart(2, '0')}"
				id={tax.id}
				sum={tax.sum}
				type={tax.type}
			/>
		{/if}
	{/each}
</div>
