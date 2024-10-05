import { db } from '$lib/server/db'
import { payments } from '$lib/server/schemas/payments'
import { getPayments } from '$lib/server/utils/getPayments'
import { eq } from 'drizzle-orm'
import type { PageServerLoad } from './$types'
import type { Actions } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const payments = await getPayments(`${params.year}-01-01`, `${params.year}-12-31`)

	return {
		payments,
	}
}

export const actions = {
	default: async (event) => {
		const { request } = event

		const data = await request.formData()

		const id = data.get('id')

		let query

		if (id) {
			query = db
				.update(payments)
				.set({
					sum: Number(data.get('sum')),
					date: data.get('date') as string,
					originalCurrency: data.get('originalCurrency') as string,
					originalSum: Number(data.get('originalSum')),
				})
				.where(eq(payments.id, Number(id)))
		} else {
			query = db.insert(payments).values({
				sum: Number(data.get('sum')),
				date: data.get('date') as string,
				originalCurrency: data.get('originalCurrency') as string,
				originalSum: Number(data.get('originalSum')),
			})
		}

		const resp = await query
		console.log('default: ~ resp:', resp)
	},
} satisfies Actions
