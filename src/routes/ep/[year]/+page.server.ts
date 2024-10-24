import { db } from '$lib/server/db'
import { getEps } from '$lib/server/utils/getEps'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { ep } from '$lib/server/schemas'
import { eq } from 'drizzle-orm'

export const load: PageServerLoad = async ({ params }) => {
	const eps = await getEps({ year: +params.year })

	return { eps }
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()

		const date = data.get('date') as string
		const value = Number(data.get('value'))
		const isUpdate = !!data.get('isUpdate')

		if (isUpdate) {
			db.update(ep).set({ date, value }).where(eq(ep.date, date)).execute()
			return
		}
		db.insert(ep).values({ date, value }).execute()
	},
} satisfies Actions
