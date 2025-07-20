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
		class="w-min"
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
		<a href="/payments/{year}">payments</a>
		<a href="/taxes/{year}">налоги</a>
		<a href="/events/{year}">events</a>
		<a href="/statistics/{year}">статистика</a>
	</nav>

	<button class="ml-auto" onclick={signOut}>sign out</button>
</header>

<main class="mt-4 grow">
	{@render children()}
</main>
