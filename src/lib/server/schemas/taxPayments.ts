import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const taxPayments = sqliteTable('tax_payments', {
	id: integer('id').primaryKey(),
	sum: integer('sum'),
	payDate: text('pay_date'),
	year: integer('year').notNull(),
	quarter: integer('quarter').notNull().$type<1 | 2 | 3 | 4>(),
	tax: integer('tax').notNull().$type<'esv' | 'ep'>(),
	latestPayDate: text('latest_pay_date').notNull(),
})

export type Payment = {
	id: number
	sum: number
	payDate: string
	year: string
	quarter: 1 | 2 | 3 | 4
	tax: 'esv' | 'ep'
	latestPayDate: string
}
