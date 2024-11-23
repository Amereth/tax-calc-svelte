import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import type { InferSelectModel } from 'drizzle-orm'

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	salt: text('salt').notNull(),
	passwordHash: text('passwordHash').notNull(),
})

export type User = InferSelectModel<typeof users>
