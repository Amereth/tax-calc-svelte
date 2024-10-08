import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const ep = sqliteTable('ep', {
	id: integer('id').primaryKey(),
	value: integer('sum').notNull(),
	date: text('date').notNull(),
})

export type Ep = {
	id: number
	value: number
	date: string
}
