import { db } from '$lib/server/db'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { eq } from 'drizzle-orm'
import { tax } from '$lib/server/schemas'
import { getTaxes } from '$lib/server/utils'

export const load: PageServerLoad = async ({ params }) => {
	const taxes = await getTaxes({ year: +params.year, name: params.taxName })

	return { taxes }
}

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData()

		const date = data.get('date') as string
		const sum = Number(data.get('sum'))
		const type = data.get('type') as 'fixed' | 'percent'

		const isUpdate = !!data.get('isUpdate')

		if (isUpdate) {
			db.update(tax).set({ date, sum }).where(eq(tax.date, date)).execute()
			return
		}

		db.insert(tax)
			.values({
				date,
				sum,
				name: params.taxName as 'esv' | 'ep',
				type,
			})
			.execute()
	},
} satisfies Actions
