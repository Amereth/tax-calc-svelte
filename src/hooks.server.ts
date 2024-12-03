import { validateSession } from '$lib/server/auth'
import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('sessionId')

	if (event.url.pathname === '/auth') {
		return resolve(event)
	}

	if (sessionCookie) {
		const { session, user } = await validateSession(sessionCookie)

		if (session && user) {
			event.locals.user = user
			event.locals.session = session
			return resolve(event)
		}
	}

	return redirect(307, '/auth')
}
