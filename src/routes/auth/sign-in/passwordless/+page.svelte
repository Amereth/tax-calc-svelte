<script lang="ts">
	import { superForm } from 'sveltekit-superforms'
	import Links from '../../(_components)/links.svelte'
	import { page } from '$app/state'
	import type { PasswordlessSignInSchema } from './schemas'
	import { twMerge } from 'tailwind-merge'
	import { ArrowRightIcon } from 'lucide-svelte'

	const { form, errors, constraints, message, enhance } =
		superForm<PasswordlessSignInSchema>(page.data.form)
</script>

<Links passwordless={true} />

{#if $message}
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
	</label>

	<button type="submit">send code</button>

	<div class="mx-auto flex items-center gap-4">
		<span> don't have an account yet? </span>
		<ArrowRightIcon class="inline" />
		<a href="/auth/sign-up">sign up</a>
	</div>
</form>
