import { db } from '$lib/server/db'
import { payments, type OriginalCurrency } from '$lib/server/schemas/payments'
import { eq } from 'drizzle-orm'
import type { PageServerLoad, Actions } from './$types'
import { getPayments } from '$lib/server/utils'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, cookies }) => {
	const sessionId = cookies.get('sessionId')

	if (!sessionId) {
		redirect(307, '/auth')
	}

	const payments = await getPayments({ year: +params.year })

	return { payments }
}

export const actions = {
	insert: async ({ request, locals }) => {
		const data = await request.formData()

		await db.insert(payments).values({
			sum: Number(data.get('sum')),
			date: data.get('date') as string,
			originalCurrency: data.get('originalCurrency') as OriginalCurrency,
			originalSum: Number(data.get('originalSum')),
			userId: locals.user.id,
		})
	},

	update: async ({ request }) => {
		const data = await request.formData()

		const id = data.get('id')

		db.update(payments)
			.set({
				sum: Number(data.get('sum')),
				date: data.get('date') as string,
				originalCurrency: data.get('originalCurrency') as OriginalCurrency,
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
