<script lang="ts">
	import { ArrowRightIcon } from 'lucide-svelte'
	import PasswordInput from '$lib/components/form/password-input.svelte'
</script>

<div>
	<div class="flex gap-10">
		<a href="/auth/passwordless-sign-in" class=" variant-outline-primary btn grow basis-1/2"
			>email</a
		>

		<a href="/auth/sign-in" class="variant-filled-primary btn grow basis-1/2"> email + password </a>
	</div>

	<form class="mt-20 flex flex-col gap-10" action="?/signIn" method="post">
		<label class="flex flex-col gap-2">
			email
			<input type="email" name="email" class="input" autocomplete="email" required />
		</label>

		<PasswordInput name="password" autocomplete="new-password" required />

		<button type="submit" class="variant-filled-primary btn">sign in</button>

		<div class="mx-auto flex items-center gap-4">
			<span> don't have an account yet? </span>
			<ArrowRightIcon class="inline" />
			<a class="d-link d-link-primary" href="/auth/sign-up">sign up</a>
		</div>
	</form>
</div>
