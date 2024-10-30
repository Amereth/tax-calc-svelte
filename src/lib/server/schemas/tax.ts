import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const tax = sqliteTable('tax', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	type: text('type').notNull().$type<'fixed' | 'percent'>(),
	value: integer('sum').notNull(),
	date: text('date').notNull(),
})

export type Tax = {
	id: number
	name: string
	type: 'fixed' | 'percent'
	value: number
	date: string
}
