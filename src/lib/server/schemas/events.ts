import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import { users } from './users'

export const events = sqliteTable('events', {
	id: integer('id').primaryKey(),
	type: text('type')
		.notNull()
		.$type<'declaration' | 'ep' | 'esv' | 'military'>(),
	sum: integer('sum'),
	year: integer('year').notNull(),
	quarter: integer('quarter').notNull().$type<1 | 2 | 3 | 4>(),
	doneDate: text('done_date'),
	latestDoneDate: text('latest_done_date').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
})

export type Event = {
	id: number
	type: 'declaration' | 'ep' | 'esv' | 'military'
	sum: number | null
	year: string
	quarter: 1 | 2 | 3 | 4
	doneDate: string | null
	latestDoneDate: string
}
