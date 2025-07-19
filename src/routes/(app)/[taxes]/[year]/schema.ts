import { type } from 'arktype'

export const newTaxSchema = type({
	name: 'string',
	type: '"fixed" | "percent"',
	sum: 'number',
	date: 'string.date',
})

export type NewTaxSchema = typeof newTaxSchema.infer

export const newTaxSchemaDefaults: NewTaxSchema = {
	name: '',
	type: 'fixed',
	sum: 0,
	date: '',
}
