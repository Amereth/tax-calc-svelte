<script lang="ts">
	import { ArrowRightIcon } from 'lucide-svelte'
	import PasswordInput from '$lib/components/form/password-input.svelte'
	import { superForm } from 'sveltekit-superforms'
	import type { SignInSchema } from '../schemas'
	import { page } from '$app/state'
	import { twMerge } from 'tailwind-merge'

	const { form, errors, constraints, message, enhance } =
		superForm<SignInSchema>(page.data.form)
</script>

<form class="flex flex-col gap-10" method="post" use:enhance>
	{#if $message}
		<h3 class="mt-10 text-center text-3xl text-error">{$message}</h3>
	{/if}

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
	</label>

	<PasswordInput
		name="password"
		bind:value={$form.password}
		errors={$errors.password}
		class={$errors.password && 'input-error'}
		aria-invalid={$errors.password ? 'true' : undefined}
		{...$constraints.password}
		autocomplete="new-password"
	/>

	<button type="submit">sign up</button>

	<div class="mx-auto flex items-center gap-4">
		<span>already have account?</span>
		<ArrowRightIcon class="inline" />
		<a href="/auth/sign-in">sign in</a>
	</div>
</form>
