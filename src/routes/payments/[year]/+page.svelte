<script lang="ts">
	import { page } from '$app/stores'
	import Month from '$lib/components/month.svelte'
	import { MONTHS } from '$lib/constants/month'
	import type { Payment } from '$lib/server/schemas/payments'
	import Summary from '$lib/components/summary.svelte'
	import type { Esv } from '$lib/server/schemas/esv'

	const year = $derived($page.params.year)

	const { payments, esvs } = $page.data as { payments: Payment[]; esvs: Esv[] }

	const currentYearPayments = $derived(
		payments.filter((payment) => {
			const [paymentYear] = payment.date.split('-').map(Number)
			return paymentYear === +year
		}),
	)

	const currentYearEsvs = $derived(
		esvs.filter((esv) => {
			const [esvYear] = esv.date.split('-').map(Number)
			return esvYear === +year
		}),
	)
</script>

<div class="flex flex-col gap-2">
	{#each MONTHS as month, index}
		<Month
			month={index}
			payments={currentYearPayments.filter((payment) => {
				const [paymentYear, paymentMonth] = payment.date.split('-').map(Number)

				if (paymentYear !== +year) return false

				if (paymentMonth !== index + 1) return false

				return true
			})}
		/>
		{#if (index + 1) % 3 === 0}
			<Summary
				payments={currentYearPayments.filter((payment) => {
					const [_, month] = payment.date.split('-').map(Number)
					return [index, index + 1, index - 1].includes(month)
				})}
				esvs={currentYearEsvs.filter((esv) =>
					[index - 2, index - 1, index].includes(+esv.date.split('-')[1] - 1),
				)}
			/>
		{/if}
	{/each}

	<Summary payments={currentYearPayments} esvs={currentYearEsvs} />
</div>
