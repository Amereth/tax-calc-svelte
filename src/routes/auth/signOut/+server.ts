import { invalidateSession } from '$lib/server/auth'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionCookie = cookies.get('sessionId')

	if (sessionCookie) {
		await invalidateSession(sessionCookie)

		cookies.delete('sessionId', {
			httpOnly: true,
			sameSite: 'strict',
			path: '/',
		})

		return new Response(null, {
			status: 307,
			headers: {
				location: '/auth',
			},
		})
	}

	return new Response('GET')
}
