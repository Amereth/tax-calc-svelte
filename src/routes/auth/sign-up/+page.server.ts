import { db } from '$lib/server/db'
import { users } from '$lib/server/schemas'
import { type Actions } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { PageServerLoad } from './$types'
import { fail, superValidate } from 'sveltekit-superforms'
import { valibot } from 'sveltekit-superforms/adapters'
import { signInSchema } from '../schemas'
import { handleSession } from '../(_utils)/handleSession'
import { commonLoad } from '../(_utils)/load'

export const load: PageServerLoad = commonLoad

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, valibot(signInSchema))

		if (!form.valid) return fail(400, { form })

		const { email, password } = form.data

		const salt = await bcrypt.genSalt(10)

		const passwordHash = await bcrypt.hash(password, salt)

		const resp = await db
			.insert(users)
			.values({ email, passwordHash, salt })
			.returning({ userId: users.id })

		const { userId } = resp[0]

		await handleSession(userId, cookies)
	},
} satisfies Actions
