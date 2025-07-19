import { and, between } from 'drizzle-orm'
import { db } from '../db'
import { taxes } from '../schemas/tax'

export const getTaxes = ({ year }: { year?: number } = {}) =>
	db
		.select()
		.from(taxes)
		.where(
			year
				? and(between(taxes.date, `${year}-01-01`, `${year}-12-31`))
				: undefined,
		)
