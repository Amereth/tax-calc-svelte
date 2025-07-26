import { and, between, eq } from 'drizzle-orm'
import { db } from '../db'
import { taxes } from '../schemas/tax'

export const getTaxes = ({
	year,
	name,
}: { year?: number; name?: string } = {}) =>
	db
		.select()
		.from(taxes)
		.where(
			and(
				year
					? and(between(taxes.date, `${year}-01-01`, `${year}-12-31`))
					: undefined,
				name ? eq(taxes.name, name) : undefined,
			),
		)
