import { sqliteTable, integer } from 'drizzle-orm/sqlite-core'
import type { InferSelectModel } from 'drizzle-orm'
import { users } from './users'

export const ssoCodes = sqliteTable('sso_codes', {
	id: integer('id').primaryKey(),
	code: integer('code').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	userEmail: integer('user_email')
		.notNull()
		.references(() => users.email),
})

export type SsoCode = InferSelectModel<typeof ssoCodes>
