import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const payments = sqliteTable('payments', {
	id: integer('id').primaryKey(),
	sum: integer('sum').notNull(),
	date: text('date').notNull(),
	originalSum: integer('secondary_sum'),
	originalCurrency: text('secondary_currency'),
})
