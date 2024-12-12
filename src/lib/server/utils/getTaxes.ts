import { and, between, eq } from 'drizzle-orm'
import { db } from '../db'
import { taxes, type Tax } from '../schemas/tax'

export const getTaxes = ({ year, name }: { year: number; name: Tax['name'] }) =>
	db
		.select()
		.from(taxes)
		.where(
			and(
				eq(taxes.name, name),
				between(taxes.date, `${year}-01-01`, `${year}-12-31`),
			),
		)
