import { between } from 'drizzle-orm'
import { db } from '../db'
import { payments } from '../schemas/payments'

export const getPayments = ({ year }: { year?: number } = {}) =>
	year
		? db
				.select()
				.from(payments)
				.where(between(payments.date, `${year}-01`, `${year}-12`))
		: db.select().from(payments)
