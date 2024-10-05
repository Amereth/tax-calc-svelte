<script lang="ts">
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import Month from '$lib/components/month.svelte'
	import { MONTHS } from '$lib/constants/month'
	import type { Payment } from '$lib/server/schemas/payments'

	let year = $state($page.params.year)

	const data = $page.data as { payments: Payment[] }

	$effect(() => {
		goto(`/${year}`)
	})

	const options = [
		...data.payments.reduce((acc, payment) => acc.add(payment.date.split('-')[0]), new Set()),
	]
</script>

<header>
	<select bind:value={year} class="select select-bordered">
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
</header>
<main class="mt-2 flex flex-col gap-2">
	{#each MONTHS as month, index}
		<Month
			month={index}
			payments={data.payments.filter((payment) => +payment.date.split('-')[1] === index + 1)}
		/>
	{/each}
</main>
