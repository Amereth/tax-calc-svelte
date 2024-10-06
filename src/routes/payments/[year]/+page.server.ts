import { db } from '$lib/server/db'
import { payments } from '$lib/server/schemas/payments'
import { getPayments } from '$lib/server/utils/getPayments'
import { eq } from 'drizzle-orm'
import type { PageServerLoad } from './$types'
import type { Actions } from './$types'

export const load: PageServerLoad = async () => {
	const payments = await getPayments()

	return {
		payments,
	}
}

export const actions = {
	insert: async ({ request }) => {
		const data = await request.formData()

		const resp = await db.insert(payments).values({
			sum: Number(data.get('sum')),
			date: data.get('date') as string,
			originalCurrency: data.get('originalCurrency') as string,
			originalSum: Number(data.get('originalSum')),
		})

		console.log('default: ~ resp:', resp)
	},

	update: async ({ request }) => {
		const data = await request.formData()

		const id = data.get('id')

		const resp = await db
			.update(payments)
			.set({
				sum: Number(data.get('sum')),
				date: data.get('date') as string,
				originalCurrency: data.get('originalCurrency') as string,
				originalSum: Number(data.get('originalSum')),
			})
			.where(eq(payments.id, Number(id)))

		console.log('default: ~ resp:', resp)
	},

	delete: async ({ request }) => {
		const data = await request.formData()

		const id = data.get('id')

		const resp = await db.delete(payments).where(eq(payments.id, Number(id)))

		console.log('default: ~ resp:', resp)
	},
} satisfies Actions
