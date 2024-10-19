import { db } from '$lib/server/db'
import { getEsvs } from '$lib/server/utils/getEsv'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { esv } from '$lib/server/schemas'
import { eq } from 'drizzle-orm'

export const load: PageServerLoad = async () => {
	const esv = await getEsvs()

	return { esv }
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()

		const date = data.get('date') as string
		const value = Number(data.get('value'))
		const isUpdate = !!data.get('isUpdate')

		if (isUpdate) {
			db.update(esv).set({ date, value }).where(eq(esv.date, date)).execute()
			return
		}

		db.insert(esv).values({ date, value }).execute()
	},
} satisfies Actions
