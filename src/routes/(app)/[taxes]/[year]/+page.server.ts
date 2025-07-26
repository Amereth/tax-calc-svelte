import { db } from '$lib/server/db'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { eq } from 'drizzle-orm'
import { taxes } from '$lib/server/schemas'
import { getTaxes } from '$lib/server/utils'
import type { Tax } from '$lib/server/schemas/tax'
import { superValidate } from 'sveltekit-superforms'
import { arktype } from 'sveltekit-superforms/adapters'
import { newTaxSchema, newTaxSchemaDefaults } from './schema'

export const load: PageServerLoad = async ({ params }) => {
	const taxes = await getTaxes({ year: +params.year })
	const allTaxes = await getTaxes()

	const form = await superValidate(
		arktype(newTaxSchema, { defaults: newTaxSchemaDefaults }),
	)

	return {
		form,
		taxes,
		taxNames: allTaxes.reduce<Tax['name'][]>((acc, tax) => {
			if (!acc.includes(tax.name)) acc.push(tax.name)
			return acc
		}, []),
	}
}

export const actions = {
	insert: async ({ request, locals }) => {
		const data = await request.formData()

		const date = data.get('date') as string
		const sum = Number(data.get('sum'))
		const type = data.get('type') as Tax['type']
		const name = data.get('name') as Tax['name']

		db.insert(taxes)
			.values({
				date,
				sum,
				name,
				type,
				userId: locals.user.id,
			})
			.execute()
	},
	update: async ({ request }) => {
		const data = await request.formData()

		const id = Number(data.get('id')) as Tax['id']
		const date = data.get('date') as string
		const sum = Number(data.get('sum'))

		db.update(taxes).set({ date, sum }).where(eq(taxes.id, id)).execute()
	},
} satisfies Actions
