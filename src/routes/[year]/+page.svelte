<script lang="ts">
	import './page.css'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import Month from '$lib/components/month.svelte'
	import { MONTHS } from '$lib/constants/month'

	let year = $state($page.params.year)

	$effect(() => {
		goto(`/${year}`)
	})

	const options = ['2023', '2024']
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
		<Month month={index} />
	{/each}
</main>
