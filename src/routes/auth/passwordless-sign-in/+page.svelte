<script lang="ts">
	import { superForm } from 'sveltekit-superforms'
	import Links from '../(_components)/links.svelte'
	import { page } from '$app/state'
	import type { PasswordlessSignInSchema } from '../schemas'
	import { twMerge } from 'tailwind-merge'

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

	<button type="submit" class="variant-filled-primary btn">sign in</button>
</form>
