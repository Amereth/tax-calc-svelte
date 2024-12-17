import { validateSession } from '$lib/server/auth'
import { redirect, type Cookies } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { valibot } from 'sveltekit-superforms/adapters'
import { passwordlessSignInSchema } from '../schemas'

export const commonLoad = async ({ cookies }: { cookies: Cookies }) => {
	const sessionId = cookies.get('sessionId')

	if (sessionId) {
		const { session } = await validateSession(sessionId)

		if (session) return redirect(307, '/')
	}

	const form = await superValidate(valibot(passwordlessSignInSchema))

	return { form }
}
