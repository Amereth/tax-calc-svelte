import { between } from 'drizzle-orm'
import { db } from '../db'
import { ep } from '../schemas/ep'

export const getEps = ({ year }: { year: number }) =>
	db
		.select()
		.from(ep)
		.where(between(ep.date, `${year}-01`, `${year}-12`))
