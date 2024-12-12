<script lang="ts">
	import { ArrowRightIcon } from 'lucide-svelte'
	import PasswordInput from '$lib/components/form/password-input.svelte'
</script>

<form class="flex flex-col gap-10" action="?/signUp" method="post">
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

	<PasswordInput name="password" autocomplete="new-password" required />

	<button type="submit" class="variant-filled-primary btn">sign up</button>

	<div class="mx-auto flex items-center gap-4">
		<span> already have account? </span>
		<ArrowRightIcon class="inline" />
		<a class="d-link d-link-primary" href="/auth/sign-in">sign in</a>
	</div>
</form>
