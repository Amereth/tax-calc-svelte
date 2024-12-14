<script lang="ts">
	import { ArrowRightIcon } from 'lucide-svelte'
	import PasswordInput from '$lib/components/form/password-input.svelte'
	import Links from '../(components)/links.svelte'
	import { superForm } from 'sveltekit-superforms'
	import { page } from '$app/stores'
	import { twMerge } from 'tailwind-merge'
	import type { SignInSchema } from '../schemas'

	const { form, errors, constraints, message, enhance } =
		superForm<SignInSchema>($page.data.form)
</script>

<div>
	<Links passwordless={false} />

	{#if $message}
		<h3 class="mt-10 text-center text-3xl text-error">{$message}</h3>
	{/if}

	<form class="mt-20 flex flex-col gap-10" method="post" use:enhance>
		<label class="flex flex-col gap-2">
			email
			<input
				name="email"
				bind:value={$form.email}
				type="email"
				class={twMerge('input', $errors.email && 'input-error')}
				autocomplete="email"
				aria-invalid={$errors.email ? 'true' : undefined}
				{...$constraints.email}
			/>
			{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
		</label>

		<PasswordInput
			name="password"
			bind:value={$form.password}
			errors={$errors.password}
			aria-invalid={$errors.password ? 'true' : undefined}
			{...$constraints.password}
			class={$errors.password && 'input-error'}
			autocomplete="new-password"
		/>

		<button type="submit" class="variant-filled-primary btn">sign in</button>

		<div class="mx-auto flex items-center gap-4">
			<span> don't have an account yet? </span>
			<ArrowRightIcon class="inline" />
			<a class="d-link d-link-primary" href="/auth/sign-up">sign up</a>
		</div>
	</form>
</div>
