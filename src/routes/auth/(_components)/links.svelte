<script lang="ts">
	import { twMerge } from 'tailwind-merge'

	const { passwordless }: { passwordless: boolean } = $props()
</script>

<div class="logo-cloud grid-cols-2 rounded-none">
	<a
		href="/auth/sign-in/passwordless"
		class={twMerge(
			'logo-item rounded-bl-md rounded-tl-md py-3',
			// passwordless ? 'variant-filled-primary' : 'variant-outline-primary',
		)}>email</a
	>
	<a
		href="/auth/sign-in"
		class={twMerge(
			'rounded-br-md rounded-tr-md py-3',
			// passwordless ? 'variant-outline-primary' : 'variant-filled-primary',
		)}
	>
		email + password
	</a>
</div>
