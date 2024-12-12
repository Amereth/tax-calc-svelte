<script lang="ts">
	import { ArrowRightIcon, EyeIcon, EyeClosedIcon } from 'lucide-svelte'
	import { fade } from 'svelte/transition'

	let isSignUp = $state(false)

	let isPasswordVisible = $state(false)

	let inputType = $derived(isPasswordVisible ? 'text' : 'password')
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
				class="d-input d-input-md d-input-bordered flex items-center gap-2"
				autocomplete="email"
				required
			/>
		</label>

		<div class="flex flex-col gap-2">
			<div class="flex items-center justify-between">
				<label for="password">password</label>

				<button
					type="button"
					class="relative h-6 w-6"
					onclick={() => (isPasswordVisible = !isPasswordVisible)}
				>
					{#if isPasswordVisible}
						<div transition:fade={{ duration: 150 }}>
							<EyeIcon class="absolute left-0 top-0" />
						</div>
					{:else}
						<div transition:fade={{ duration: 150 }}>
							<EyeClosedIcon class="absolute left-0 top-0" />
						</div>
					{/if}
				</button>
			</div>

			<input
				id="password"
				type={inputType}
				name="password"
				class="d-input d-input-md d-input-bordered flex items-center gap-2"
				autocomplete="new-password"
				required
			/>
		</div>

		<button type="submit" class="d-btn d-btn-primary">{isSignUp ? 'sign up' : 'sign in'}</button>

		<div class="mx-auto flex items-center gap-4">
			{#if isSignUp}
				<span> already have account? </span>
				<ArrowRightIcon class="inline" />
				<button class="d-link d-link-primary" onclick={() => (isSignUp = !isSignUp)}>sign in</button
				>
			{:else}
				<span> don't have an account yet? </span>
				<ArrowRightIcon class="inline" />
				<button class="d-link d-link-primary" onclick={() => (isSignUp = !isSignUp)}>sign up</button
				>
			{/if}
		</div>
	</form>
</main>
