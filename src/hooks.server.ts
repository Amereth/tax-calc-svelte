import { validateSession } from '$lib/server/auth'
import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('sessionId')

	if (event.url.pathname === '/auth') {
		return resolve(event)
	}

	if (sessionCookie) {
		const { session } = await validateSession(sessionCookie)

		if (session) return resolve(event)
	}

	return redirect(307, '/auth')
}
