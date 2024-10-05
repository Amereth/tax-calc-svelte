import { and, gte, lte } from 'drizzle-orm'
import { db } from '../db'
import { payments } from '../schemas/payments'

export const getPayments = async (rangeStart: string, rangeEnd: string) => {
	const paymentsD = await db
		.select()
		.from(payments)
		.where(and(gte(payments.date, rangeStart), lte(payments.date, rangeEnd)))
	return paymentsD
}
