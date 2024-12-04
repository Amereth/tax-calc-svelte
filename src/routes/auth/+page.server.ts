import {
	createSession,
	generateSessionId,
	SESSION_EXPIRATION_PERIOD,
	validateSession,
} from '$lib/server/auth'
import { db } from '$lib/server/db'
import { users } from '$lib/server/schemas'
import type { User } from '$lib/server/schemas/users'
import { redirect, type Actions, type Cookies } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('sessionId')

	if (sessionId) {
		const { session } = await validateSession(sessionId)

		if (session) return redirect(307, '/')
	}
}

const handleSession = async (userId: User['id'], cookies: Cookies) => {
	const sessionId = generateSessionId()

	const session = await createSession(sessionId, userId)

	cookies.set('sessionId', session.id, {
		httpOnly: true,
		sameSite: 'strict',
		path: '/',
		maxAge: SESSION_EXPIRATION_PERIOD,
	})

	return redirect(307, '/')
}

export const actions = {
	signUp: async ({ request, cookies }) => {
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

	signIn: async ({ request, cookies }) => {
		const formData = await request.formData()

		const email = formData.get('email') as string
		const password = formData.get('password') as string

		if (!email || !password) {
			return { status: 400, body: { error: 'Email and password are required' } }
		}

		const user = await db.query.users.findFirst({
			where: eq(users.email, email),
		})

		if (!user?.salt) {
			return {
				status: 400,
				body: { error: 'invalid email or password or only passwordless entry is supported' },
			}
		}

		const passwordHash = await bcrypt.hash(password, user.salt)

		if (passwordHash !== user.passwordHash) {
			return {
				status: 400,
				body: { error: 'invalid email or password or only passwordless entry is supported' },
			}
		}

		await handleSession(user.id, cookies)
	},
} satisfies Actions
