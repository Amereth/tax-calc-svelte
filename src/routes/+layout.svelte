<script lang="ts">
	import '../app.css'
	import type { Payment } from '$lib/server/schemas/payments'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	let year = $state($page.params.year)

	let { children } = $props()

	console.log($page)

	const data = $page.data as { payments: Payment[] }

	const options = [
		...data.payments.reduce((acc, payment) => acc.add(payment.date.split('-')[0]), new Set()),
	]
</script>

<header>
	<select bind:value={year} class="select select-bordered" onchange={() => goto(`/${year}`)}>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
	<a class="link link-primary" href={`/payments/${year}`}>payments</a>
	<a class="link link-primary" href={`/esv/${year}`}>esv</a>
</header>

{@render children()}
