import {
	generateSessionId,
	createSession,
	SESSION_EXPIRATION_PERIOD,
} from '$lib/server/auth'
import type { User } from '$lib/server/schemas/users'
import { type Cookies, redirect } from '@sveltejs/kit'

export const handleSession = async (userId: User['id'], cookies: Cookies) => {
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
