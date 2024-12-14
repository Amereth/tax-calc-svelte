<script lang="ts">
	import Links from '../(components)/links.svelte'
</script>

<div>
	<Links passwordless={true} />

	<form class="mt-20 flex flex-col gap-10" action="?/signIn" method="post">
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
</div>
