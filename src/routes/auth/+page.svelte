<script lang="ts">
	import { ArrowRightIcon } from 'lucide-svelte'

	let isSignUp = $state(false)
</script>

<main class="mt-8 h-full">
	<form
		class="mx-auto grid h-full w-80 place-content-center justify-stretch gap-10"
		action={isSignUp ? '?/signUp' : '?/signIn'}
		method="post"
	>
		<label class="flex flex-col gap-2">
			email
			<input
				type="email"
				name="email"
				class="input input-md input-bordered flex items-center gap-2"
				autocomplete="email"
				required
			/>
		</label>

		<label class="flex flex-col gap-2">
			password
			<input
				type="password"
				name="password"
				class="input input-md input-bordered flex items-center gap-2"
				autocomplete="new-password"
				required
			/>
		</label>

		<button type="submit" class="btn btn-primary">{isSignUp ? 'sign up' : 'sign in'}</button>

		<div class="mx-auto flex items-center gap-4">
			{#if isSignUp}
				<span> already have account? </span>
				<ArrowRightIcon class="inline" />
				<button class="link link-primary" onclick={() => (isSignUp = !isSignUp)}>sign in</button>
			{:else}
				<span> don't have an account yet? </span>
				<ArrowRightIcon class="inline" />
				<button class="link link-primary" onclick={() => (isSignUp = !isSignUp)}>sign up</button>
			{/if}
		</div>
	</form>
</main>
