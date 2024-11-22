import { db } from '$lib/server/db'
import { payments } from '$lib/server/schemas/payments'
import { eq } from 'drizzle-orm'
import type { PageServerLoad, Actions } from './$types'
import { getPayments, getTaxes } from '$lib/server/utils'

export const load: PageServerLoad = async ({ params }) => {
	const [payments, esvs, eps] = await Promise.all([
		getPayments({ year: +params.year }),
		getTaxes({ year: +params.year, name: 'esv' }),
		getTaxes({ year: +params.year, name: 'ep' }),
	])

	return { payments, esvs, eps }
}

export const actions = {
	insert: async ({ request }) => {
		const data = await request.formData()

		db.insert(payments)
			.values({
				sum: Number(data.get('sum')),
				date: data.get('date') as string,
				originalCurrency: data.get('originalCurrency') as string,
				originalSum: Number(data.get('originalSum')),
			})
			.execute()
	},

	update: async ({ request }) => {
		const data = await request.formData()

		const id = data.get('id')

		db.update(payments)
			.set({
				sum: Number(data.get('sum')),
				date: data.get('date') as string,
				originalCurrency: data.get('originalCurrency') as string,
				originalSum: Number(data.get('originalSum')),
			})
			.where(eq(payments.id, Number(id)))
			.execute()
	},

	delete: async ({ request }) => {
		const data = await request.formData()

		const id = data.get('id')

		db.delete(payments)
			.where(eq(payments.id, Number(id)))
			.execute()
	},
} satisfies Actions
