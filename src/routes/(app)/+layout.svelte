<script lang="ts">
	import { page } from '$app/state'
	import { goto } from '$app/navigation'

	let year = $state(page.params.year)

	let { children } = $props()

	const { years } = $derived(page.data) as { years: string[] }

	const signOut = async () => {
		const resp = await fetch('/auth/signOut')

		if (resp.ok) goto('/auth')
	}
</script>

<header class="flex items-center gap-8">
	<select
		bind:value={year}
		class="select variant-outline-primary w-min"
		onchange={() => {
			const url = page.url.pathname.slice(0, -5)
			goto(`${url}/${year}`)
		}}
	>
		{#each years as year}
			<option value={year}>{year}</option>
		{/each}
	</select>

	<nav class="flex gap-8">
		<a class="d-link d-link-primary" href="/payments/{year}">payments</a>
		<a class="d-link d-link-primary" href="/esv/{year}">ЄСВ</a>
		<a class="d-link d-link-primary" href="/ep/{year}">ЄП</a>
		<a class="d-link d-link-primary" href="/events/{year}">events</a>
	</nav>

	<button class="variant-outline-primary btn btn-sm ml-auto" onclick={signOut}
		>sign out</button
	>
</header>

<main class="mt-4 grow">
	{@render children()}
</main>
