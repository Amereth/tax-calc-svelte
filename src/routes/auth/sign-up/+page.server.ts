import { db } from '$lib/server/db'
import { users } from '$lib/server/schemas'
import { redirect, type Actions } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { PageServerLoad } from './$types'
import { fail, superValidate } from 'sveltekit-superforms'
import { valibot } from 'sveltekit-superforms/adapters'
import { signInSchema } from '../schemas'
import { handleSession } from '../(_utils)/handleSession'
import { validateSession } from '$lib/server/auth'

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('sessionId')

	if (sessionId) {
		const { session } = await validateSession(sessionId)

		if (session) return redirect(307, '/')
	}

	const form = await superValidate(valibot(signInSchema))

	return { form }
}

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, valibot(signInSchema))

		if (!form.valid) return fail(400, { form })

		const { email, password } = form.data

		const salt = await bcrypt.genSalt(10)

		const passwordHash = await bcrypt.hash(password, salt)

		const resp = await db
			.insert(users)
			.values({ email, passwordHash, salt })
			.returning({ userId: users.id })

		const { userId } = resp[0]

		await handleSession(userId, cookies)
	},
} satisfies Actions
