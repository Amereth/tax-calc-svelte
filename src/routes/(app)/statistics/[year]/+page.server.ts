import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { getEvents, getPayments } from '$lib/server/utils'

export const load: PageServerLoad = async ({ params, cookies }) => {
	const sessionId = cookies.get('sessionId')

	if (!sessionId) {
		redirect(307, '/auth')
	}

	const [payments, events] = await Promise.all([
		getPayments({ year: +params.year }),
		getEvents({ year: +params.year }),
	])

	const taxes = events
		.filter((event) => event.type !== 'declaration')
		.reduce(
			(acc, event) => {
				if (event.quarter === 1) acc[0] += event.sum ?? 0
				if (event.quarter === 2) acc[1] += event.sum ?? 0
				if (event.quarter === 3) acc[2] += event.sum ?? 0
				if (event.quarter === 4) acc[3] += event.sum ?? 0
				return acc
			},
			[0, 0, 0, 0],
		)

	return { payments, taxes }
}
