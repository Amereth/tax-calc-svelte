import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const esv = sqliteTable('esv', {
	id: integer('id').primaryKey(),
	value: integer('sum').notNull(),
	date: text('date').notNull(),
})

export type Esv = {
	id: number
	value: number
	date: string
}
