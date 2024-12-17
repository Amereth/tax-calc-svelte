import { db } from '$lib/server/db'
import { users } from '$lib/server/schemas'
import { type Actions } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import { fail, message, superValidate } from 'sveltekit-superforms'
import { valibot } from 'sveltekit-superforms/adapters'
import { signInSchema } from '../schemas'
import type { PageServerLoad } from './$types'
import { handleSession } from '../(_utils)/handleSession'
import { commonLoad } from '../(_utils)/load'

export const load: PageServerLoad = commonLoad

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, valibot(signInSchema))

		if (!form.valid) return fail(400, { form })

		const { email, password } = form.data

		const user = await db.query.users.findFirst({
			where: eq(users.email, email),
		})

		if (!user?.salt) {
			return message(
				form,
				'invalid email or password or only passwordless entry is supported',
			)
		}

		const passwordHash = await bcrypt.hash(password, user.salt)

		if (passwordHash !== user.passwordHash) {
			return message(
				form,
				'invalid email or password or only passwordless entry is supported',
			)
		}

		await handleSession(user.id, cookies)
	},
} satisfies Actions
