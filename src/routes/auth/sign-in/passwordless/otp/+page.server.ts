import { db } from '$lib/server/db'
import { otpCodes } from '$lib/server/schemas'
import { redirect, type Actions } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { fail, message, superValidate } from 'sveltekit-superforms'
import { valibot } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'
import { validateSession } from '$lib/server/auth'
import { handleSession } from '../../../(_utils)/handleSession'
import { otpSchema } from './schemas'

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('sessionId')

	if (sessionId) {
		const { session } = await validateSession(sessionId)

		if (session) return redirect(307, '/')
	}

	const form = await superValidate(valibot(otpSchema))

	return { form }
}

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, valibot(otpSchema))

		if (!form.valid) return fail(400, { form })

		const { code } = form.data

		const otp = await db.query.otpCodes.findFirst({
			where: eq(otpCodes.code, +code),
		})

		const now = Date.now()

		if (!otp || now > otp.expiryDate) {
			return message(form, 'otp not found')
		}

		return await handleSession(otp.userId, cookies)
	},
} satisfies Actions
