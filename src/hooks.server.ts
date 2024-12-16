import { validateSession } from '$lib/server/auth'
import { error, redirect, type Handle } from '@sveltejs/kit'
import { ORIGIN } from '$env/static/private'

export const handle: Handle = async ({ event, resolve }) => {
	const { request, cookies, url, locals } = event

	// CSRF protection
	if (event.request.method !== 'GET') {
		const origin = request.headers.get('origin')

		if (origin !== ORIGIN) {
			throw error(403, 'Forbidden')
		}
	}

	const sessionCookie = cookies.get('sessionId')

	if (url.pathname.includes('auth')) {
		console.log('1:', url.pathname)
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

	return redirect(307, '/auth/sign-in')
}
