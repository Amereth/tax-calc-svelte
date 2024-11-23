import { db } from '$lib/server/db'
import { users } from '$lib/server/schemas'
import type { Actions } from '@sveltejs/kit'
import bcrypt from 'bcrypt'

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData()

		const email = formData.get('email') as string
		const password = formData.get('password') as string

		if (!email || !password) {
			return { status: 400, body: { error: 'Email and password are required' } }
		}

		const salt = await bcrypt.genSalt(10)

		const passwordHash = await bcrypt.hash(password, salt)

		await db.insert(users).values({
			email,
			passwordHash,
			salt,
		})
	},
} satisfies Actions
