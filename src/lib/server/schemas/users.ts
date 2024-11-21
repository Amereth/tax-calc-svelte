import { sqliteTable, integer } from 'drizzle-orm/sqlite-core'
import type { InferSelectModel } from 'drizzle-orm'

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
})

export type User = InferSelectModel<typeof users>
