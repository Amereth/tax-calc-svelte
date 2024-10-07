import { db } from '../db'
import { payments } from '../schemas/payments'

export const getPayments = () => db.select().from(payments)
