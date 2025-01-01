<script lang="ts">
	import Chart from 'chart.js/auto'
	import { MONTHS } from '$lib/constants/month'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const payments = $derived(data.payments)
	const taxes = $derived(data.taxes)

	let paymentsChartNode = $state<HTMLCanvasElement>()
	let paymentsChart = $state<Chart>()

	$effect(() => {
		if (!paymentsChartNode) return

		paymentsChart = new Chart(paymentsChartNode, {
			type: 'line',
			data: {
				labels: MONTHS as unknown as string[],
				datasets: [
					{
						label: 'доходи',
						data: payments.map((payment) => payment.sum),
						fill: false,
						borderColor: '#ffc31f',
						tension: 0.1,
					},
					{
						label: 'доходи',
						data: taxes,
						fill: false,
						borderColor: '#ff7b00',
						tension: 0.1,
					},
				],
			},
		})
	})
</script>

<div class="flex flex-col">
	{#key payments}
		<canvas bind:this={paymentsChartNode}></canvas>
	{/key}
</div>
