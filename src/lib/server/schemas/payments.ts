import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import type { InferSelectModel } from 'drizzle-orm'

export const payments = sqliteTable('payments', {
	id: integer('id').primaryKey(),
	sum: integer('sum').notNull(),
	date: text('date').notNull(),
	originalSum: integer('secondary_sum'),
	originalCurrency: text('secondary_currency'),
})

export type Payment = InferSelectModel<typeof payments>
