import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import type { InferSelectModel } from 'drizzle-orm'
import { users } from './users'

export const payments = sqliteTable('payments', {
	id: integer('id').primaryKey(),
	sum: integer('sum').notNull(),
	date: text('date').notNull(),
	originalSum: integer('original_sum'),
	originalCurrency: text('original_currency').$type<'EUR' | 'USD'>(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
})

export type Payment = InferSelectModel<typeof payments>

export type OriginalCurrency = Payment['originalCurrency']
