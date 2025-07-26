<script lang="ts">
	import { page } from '$app/state'
	import Month from '$lib/components/month.svelte'
	import { MONTHS } from '$lib/constants/month'
	import type { Payment } from '$lib/server/schemas/payments'
	import Summary from '$lib/components/summary.svelte'
	import { getCurrentYearValues } from '$lib/utils/getCurrentYearValues'
	import { twMerge } from 'tailwind-merge'

	const year = $derived(page.params.year)

	const { payments } = $derived(page.data) as { payments: Payment[] }

	const currentYearPayments = $derived(getCurrentYearValues(year, payments))
</script>

<div class="flex flex-col gap-2">
	<Summary
		payments={currentYearPayments}
		className="mb-6 text-primary pr-6 ml-4"
	/>

	{#each MONTHS as month, index}
		<div
			class={twMerge(
				'border-b-primary-200 border-t-surface-900 hover:border-b-primary rounded-xl border-y-2 px-2 pt-2',
				'transition-colors duration-300 ease-out',
			)}
		>
			<Month
				month={index}
				payments={currentYearPayments.filter((payment) => {
					const [paymentYear, paymentMonth] = payment.date
						.split('-')
						.map(Number)

					if (paymentYear !== +year) return false

					if (paymentMonth !== index + 1) return false

					return true
				})}
			/>
		</div>

		{#if (index + 1) % 3 === 0}
			<Summary
				payments={currentYearPayments.filter((payment) => {
					const [_, month] = payment.date.split('-').map(Number)
					return [index, index + 1, index - 1].includes(month)
				})}
				className="mb-6 mt-2 text-primary pr-10 ml-4"
			/>
		{/if}
	{/each}
</div>
