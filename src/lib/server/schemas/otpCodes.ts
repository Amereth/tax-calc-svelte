import { sqliteTable, integer } from 'drizzle-orm/sqlite-core'
import type { InferSelectModel } from 'drizzle-orm'
import { users } from './users'

export const otpCodes = sqliteTable('otp_codes', {
	id: integer('id').primaryKey(),
	code: integer('code').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	userEmail: integer('user_email')
		.notNull()
		.references(() => users.email),
	expiryDate: integer('expiry_date').notNull(),
	isUsed: integer('is_used').notNull().default(0),
})

export type OtpCode = InferSelectModel<typeof otpCodes>
