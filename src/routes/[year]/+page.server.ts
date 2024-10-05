import { db } from '$lib/server/db'
import { payments } from '$lib/server/schemas/payments'
import { getPayments } from '$lib/server/utils/getPayments'
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

		db.insert(payments).values({
			sum: Number(data.get('sum')),
			date: data.get('date') as string,
			originalCurrency: data.get('originalCurrency') as string,
			originalSum: Number(data.get('originalSum')),
		})
	},
} satisfies Actions
