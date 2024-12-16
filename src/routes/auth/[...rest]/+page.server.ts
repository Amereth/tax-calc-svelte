import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = ({ cookies }) => {
	const sessionId = cookies.get('sessionId')

	if (!sessionId) return redirect(307, '/auth/sign-in')
}
