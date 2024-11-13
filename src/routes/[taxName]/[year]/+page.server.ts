import { db } from '$lib/server/db'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { eq } from 'drizzle-orm'
import { tax } from '$lib/server/schemas'
import { getTaxes } from '$lib/server/utils'
import type { Tax } from '$lib/server/schemas/tax'

export const load: PageServerLoad = async ({ params }) => {
	const taxes = await getTaxes({ year: +params.year, name: params.taxName })

	return { taxes }
}

export const actions = {
	insert: async ({ request, params }) => {
		const data = await request.formData()

		const date = data.get('date') as string
		const sum = Number(data.get('sum'))
		const type = data.get('type') as 'fixed' | 'percent'

		db.insert(tax)
			.values({
				date,
				sum,
				name: params.taxName as 'esv' | 'ep',
				type,
			})
			.execute()
	},
	update: async ({ request }) => {
		const data = await request.formData()

		const id = Number(data.get('id')) as Tax['id']
		const date = data.get('date') as string
		const sum = Number(data.get('sum'))

		db.update(tax).set({ date, sum }).where(eq(tax.id, id)).execute()
	},
} satisfies Actions
