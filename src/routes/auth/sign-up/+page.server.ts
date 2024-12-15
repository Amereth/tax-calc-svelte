import { validateSession } from '$lib/server/auth'
import { db } from '$lib/server/db'
import { users } from '$lib/server/schemas'
import { redirect, type Actions } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { PageServerLoad } from './$types'
import { superValidate } from 'sveltekit-superforms'
import { valibot } from 'sveltekit-superforms/adapters'
import { signInSchema } from '../schemas'
import { handleSession } from '../(utils)/handleSession'

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
		const formData = await request.formData()

		const email = formData.get('email') as string
		const password = formData.get('password') as string

		if (!email || !password) {
			return { status: 400, body: { error: 'Email and password are required' } }
		}

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
