import type { InferSelectModel } from 'drizzle-orm'
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const taxes = sqliteTable('tax', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	type: text('type').notNull().$type<'fixed' | 'percent'>(),
	sum: integer('sum').notNull(),
	date: text('date').notNull(),
})

export type Tax = InferSelectModel<typeof taxes>
