<script lang="ts">
	import '../../app.css'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	let year = $state($page.params.year)

	let { children } = $props()

	const { years } = $derived($page.data) as { years: string[] }
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
		{#each years as year}
			<option value={year}>{year}</option>
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
