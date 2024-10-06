<script lang="ts">
	import { page } from '$app/stores'
	import Month from '$lib/components/month.svelte'
	import { MONTHS } from '$lib/constants/month'
	import type { Payment } from '$lib/server/schemas/payments'
	import Summary from '$lib/components/summary.svelte'

	let year = $state($page.params.year)

	const data = $page.data as { payments: Payment[] }

	const currentYearPayments = data.payments.filter((payment) => {
		const [paymentYear] = payment.date.split('-').map(Number)
		return paymentYear === +year
	})
</script>

<main class="mt-2 flex flex-col gap-2">
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
			/>
		{/if}
	{/each}
</main>
