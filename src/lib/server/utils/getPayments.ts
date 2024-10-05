import { db } from '../db'
import { payments } from '../schemas/payments'

export const getPayments = async () => {
	const paymentsD = await db.select().from(payments)
	return paymentsD
}
