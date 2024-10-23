import { between } from 'drizzle-orm'
import { db } from '../db'
import { esv } from '../schemas/esv'

export const getEsvs = ({ year }: { year: number }) =>
	db
		.select()
		.from(esv)
		.where(between(esv.date, `${year}-01`, `${year}-12`))
