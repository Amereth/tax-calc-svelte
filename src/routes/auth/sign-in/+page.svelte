<script lang="ts">
	import { ArrowRightIcon } from 'lucide-svelte'
	import PasswordInput from '$lib/components/form/password-input.svelte'
	import Links from '../(_components)/links.svelte'
	import { superForm } from 'sveltekit-superforms'
	import { page } from '$app/state'
	import { twMerge } from 'tailwind-merge'
	import type { SignInSchema } from '../schemas'

	const { form, errors, constraints, message, enhance } =
		superForm<SignInSchema>(page.data.form)
</script>

<Links passwordless={false} />

{#if message}
	<h3 class="mt-10 text-center text-3xl text-error">{$message}</h3>
{/if}

<form class="mt-20 flex flex-col gap-10" method="post" use:enhance>
	<label class="flex flex-col gap-2">
		email
		<input
			name="email"
			type="email"
			bind:value={$form.email}
			class={twMerge('input', $errors.email && 'input-error')}
			aria-invalid={$errors.email ? 'true' : undefined}
			autocomplete="email"
			{...$constraints.email}
		/>
		{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
	</label>

	<PasswordInput
		name="password"
		bind:value={$form.password}
		errors={$errors.password}
		class={$errors.password && 'input-error'}
		aria-invalid={$errors.password ? 'true' : undefined}
		{...$constraints.password}
	/>

	<button type="submit">sign in</button>

	<div class="mx-auto flex items-center gap-4">
		<span> don't have an account yet? </span>
		<ArrowRightIcon class="inline" />
		<a href="/auth/sign-up">sign up</a>
	</div>
</form>
