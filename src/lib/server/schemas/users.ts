import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import type { InferSelectModel } from 'drizzle-orm'

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	email: text('email').notNull(),
	salt: text('salt'),
	passwordHash: text('passwordHash'),
})

export type User = InferSelectModel<typeof users>
