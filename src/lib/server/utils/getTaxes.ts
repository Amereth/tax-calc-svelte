import { and, between, eq } from 'drizzle-orm'
import { db } from '../db'
import { tax, type Tax } from '../schemas/tax'

export const getTaxes = ({ year, name }: { year: number; name: Tax['name'] }) =>
	db
		.select()
		.from(tax)
		.where(and(eq(tax.name, name), between(tax.date, `${year}-01`, `${year}-12`)))
