import { db } from '$lib/server/db'
import { events } from '$lib/server/schemas'
import type { Event } from '$lib/server/schemas/events'
import { getEvents, getPayments, getTaxes } from '$lib/server/utils'
import { toObject } from '$lib/utils/formDataToObject'
import { eq } from 'drizzle-orm'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const [payments, esvs, eps, events] = await Promise.all([
		getPayments({ year: +params.year }),
		getTaxes({ year: +params.year, name: 'esv' }),
		getTaxes({ year: +params.year, name: 'ep' }),
		getEvents({ year: +params.year }),
	])

	return { payments, esvs, eps, events }
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
	update: async ({ request }) => {
		const formData = await request.formData()
		const data = toObject(formData) as Omit<Event, 'id'> & { id?: number }

		const insertData = {
			...data,
			year: Number(data.year),
			quarter: Number(data.quarter) as Event['quarter'],
			sum: Number(data.sum),
		}

		delete insertData.id

		await db
			.update(events)
			.set(insertData)
			.where(eq(events.id, Number(data.id)))
	},
} satisfies Actions
