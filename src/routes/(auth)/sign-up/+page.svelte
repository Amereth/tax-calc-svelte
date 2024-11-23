<form class="mx-auto grid h-full w-80 place-content-center justify-stretch gap-10">
	<label class="flex flex-col gap-2">
		email
		<input
			type="email"
			name="email"
			class="input input-md input-bordered flex items-center gap-2"
			autocomplete="email"
		/>
	</label>

	<label class="flex flex-col gap-2">
		password
		<input
			type="password"
			name="password"
			class="input input-md input-bordered flex items-center gap-2"
			autocomplete="new-password"
		/>
	</label>

	<button type="submit" class="btn btn-primary">sign up</button>

	<div class="mx-auto">
		already have an account?
		<a href="/auth/login" class="link link-primary">login</a>
	</div>
</form>
