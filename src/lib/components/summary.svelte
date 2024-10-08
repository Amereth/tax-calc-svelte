<script lang="ts">
	import type { Esv } from '$lib/server/schemas/esv'
	import type { Payment } from '$lib/server/schemas/payments'
	import { formatter } from '$lib/utils/formatter'

	const { payments, esvs }: { payments: Payment[]; esvs: Esv[] } = $props()

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

	const totalEsv = $derived(esvs.reduce((acc, esv) => acc + (esv.value || 0), 0))
</script>

<div class="">
	<div class="mb-6 ml-4 flex gap-8 pr-12">
		<div class="flex gap-4">
			<span>ЄСВ</span>
			<span class="ml-auto">
				{formatter('UAH').format(totalEsv)}
			</span>

			<span class="ml-12 inline-block">ЄП</span>
			<span>
				{formatter('UAH').format(totalEsv)}
			</span>
		</div>

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
