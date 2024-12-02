import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import type { InferSelectModel } from 'drizzle-orm'
import { users } from './users'

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id').references(() => users.id),
	expiresAt: integer('expires_at', {
		mode: 'timestamp',
	}).notNull(),
})

export type Session = InferSelectModel<typeof sessions>
