<script lang="ts">
	import '../app.css'
	import type { Payment } from '$lib/server/schemas/types'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	let year = $state($page.params.year)

	let { children } = $props()

	const data = $page.data as { payments: Payment[] }

	const options = [
		...data.payments.reduce((acc, payment) => acc.add(payment.date.split('-')[0]), new Set()),
	]
</script>

<header class="flex items-center gap-8">
	<select
		bind:value={year}
		class="select select-bordered select-sm"
		onchange={() => {
			const url = $page.url.pathname.slice(0, -5)
			goto(`${url}/${year}`)
		}}
	>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
	<nav class="flex gap-8">
		<a class="link link-primary" href="/payments/{year}">payments</a>
		<a class="link link-primary" href="/esv/{year}">ЄСВ</a>
		<a class="link link-primary" href="/ep/{year}">ЄП</a>
		<a class="link link-primary" href="/events/{year}">events</a>
	</nav>
</header>

<main class="mt-8">
	{@render children()}
</main>
