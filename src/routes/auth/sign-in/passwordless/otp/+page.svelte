<script lang="ts">
	import { superForm } from 'sveltekit-superforms'
	import { page } from '$app/state'
	import { twMerge } from 'tailwind-merge'
	import { ArrowRightIcon } from 'lucide-svelte'
	import type { OtpSchema } from './schemas'
	import Links from '../../../(_components)/links.svelte'

	const { form, errors, constraints, message, enhance } = superForm<OtpSchema>(
		page.data.form,
	)
</script>

<Links passwordless={true} />

{#if $message}
	<h3 class="mt-10 text-center text-3xl text-error">{$message}</h3>
{/if}

<form class="mt-20 flex flex-col gap-10" method="post" use:enhance>
	<label class="flex flex-col gap-2">
		code
		<input
			name="code"
			type="text"
			bind:value={$form.code}
			class={twMerge('input', $errors.code && 'input-error')}
			aria-invalid={$errors.code ? 'true' : undefined}
			{...$constraints.code}
		/>
	</label>

	<button type="submit">sign in</button>

	<div class="mx-auto flex items-center gap-4">
		<span> didn't receive the code? </span>
		<ArrowRightIcon class="inline" />
		<a href="/auth/sign-in/passwordless"> send another one </a>
	</div>
</form>
