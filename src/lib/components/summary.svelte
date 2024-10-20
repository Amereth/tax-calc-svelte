<script lang="ts">
	import type { Payment } from '$lib/server/schemas/payments'
	import { formatter } from '$lib/utils/formatter'

	const { payments }: { payments: Payment[] } = $props()

	const total = $derived(payments.reduce((acc, payment) => acc + payment.sum, 0))

	const totalEur = $derived(
		payments.reduce(
			(acc, payment) => acc + (payment.originalCurrency === 'EUR' ? payment.originalSum || 0 : 0),
			0,
		),
	)

	const totalUsd = $derived(
		payments.reduce(
			(acc, payment) => acc + (payment.originalCurrency === 'USD' ? payment.originalSum || 0 : 0),
			0,
		),
	)
</script>

<div>
	<div class="mb-6 ml-4 flex gap-8 pr-12">
		<span class="ml-auto">
			{formatter('UAH').format(total)}
		</span>
		<span>/</span>
		<span>
			{formatter('EUR').format(totalEur)}
		</span>
		<span>-</span>
		<span>
			{formatter('USD').format(totalUsd)}
		</span>
	</div>
</div>
