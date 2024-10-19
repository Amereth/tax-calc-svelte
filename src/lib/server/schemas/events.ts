import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const events = sqliteTable('events', {
	id: integer('id').primaryKey(),
	type: text('type').notNull().$type<'declaration' | 'ep' | 'esv'>(),
	sum: integer('sum'),
	doneDate: text('done_date'),
	year: integer('year').notNull(),
	quarter: integer('quarter').notNull().$type<1 | 2 | 3 | 4>(),
	latestDoneDate: text('latest_done_date').notNull(),
})

export type Event = {
	id: number
	type: 'declaration' | 'ep' | 'esv'
	sum: number | null
	doneDate: string | null
	year: string
	quarter: 1 | 2 | 3 | 4
	latestDoneDate: string
}
