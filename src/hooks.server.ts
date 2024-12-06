import { validateSession } from '$lib/server/auth'
import { error, redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const { request, cookies, url, locals } = event

	// CSRF protection
	if (event.request.method !== 'GET') {
		const origin = request.headers.get('origin')

		if (origin !== process.env.ORIGIN) {
			throw error(403, 'Forbidden')
		}
	}

	const sessionCookie = cookies.get('sessionId')

	if (url.pathname === '/auth') {
		return resolve(event)
	}

	if (sessionCookie) {
		const { session, user } = await validateSession(sessionCookie)

		if (session && user) {
			locals.user = user
			locals.session = session
			return resolve(event)
		}
	}

	return redirect(307, '/auth')
}
