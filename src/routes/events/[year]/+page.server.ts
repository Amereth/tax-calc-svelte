import { db } from '$lib/server/db'
import { events } from '$lib/server/schemas'
import type { Event } from '$lib/server/schemas/events'
import { getEps } from '$lib/server/utils/getEps'
import { getEsvs } from '$lib/server/utils/getEsv'
import { getPayments } from '$lib/server/utils/getPayments'
import { toObject } from '$lib/utils/formDataToObject'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const [payments, esvs, eps] = await Promise.all([getPayments(), getEsvs(), getEps()])

	return {
		payments,
		esvs,
		eps,
	}
}

export const actions = {
	insert: async ({ request }) => {
		const formData = await request.formData()
		const data = toObject(formData) as Event

		const insertData = {
			...data,
			year: Number(data.year),
			quarter: Number(data.quarter) as Event['quarter'],
			sum: Number(data.sum),
		}

		await db.insert(events).values(insertData)
	},
} satisfies Actions
