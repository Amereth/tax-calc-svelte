<script lang="ts">
	import type { Ep } from '$lib/server/schemas/ep'
	import type { Esv } from '$lib/server/schemas/esv'
	import type { Payment } from '$lib/server/schemas/payments'
	import { formatter } from '$lib/utils/formatter'

	const { payments, esvs, eps }: { payments: Payment[]; esvs: Esv[]; eps: Ep[] } = $props()

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

	const totalEp = $derived(
		payments.reduce((acc, payment) => {
			const ep = eps.find((ep) => ep.date === payment.date.slice(0, 7))
			if (!ep) return acc
			acc = acc + payment.sum * ep.value
			return acc
		}, 0),
	)
</script>

<div>
	<div class="mb-6 ml-4 flex gap-8 pr-12">
		<div class="flex gap-4">
			<span class="w-10">ЄСВ</span>
			<span class="w-20">
				{formatter('UAH').format(totalEsv)}
			</span>
			<span class="ml-12 w-10">ЄП</span>
			<span>
				{formatter('UAH').format(totalEp)}
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
