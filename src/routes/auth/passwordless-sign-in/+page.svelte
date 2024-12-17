<script lang="ts">
	import Links from '../(_components)/links.svelte'
</script>

<Links passwordless={true} />

<form class="mt-20 flex flex-col gap-10" method="post">
	<label class="flex flex-col gap-2">
		email
		<input
			type="email"
			name="email"
			class="input"
			autocomplete="email"
			required
		/>
	</label>

	<button type="submit" class="variant-filled-primary btn">sign in</button>
</form>
