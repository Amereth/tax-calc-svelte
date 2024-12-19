import { db } from '$lib/server/db'
import { otpCodes, users } from '$lib/server/schemas'
import { redirect, type Actions } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { fail, message, superValidate } from 'sveltekit-superforms'
import { valibot } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'
import { generateOTP, validateSession } from '$lib/server/auth'
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend'
import { MAILERSEND_API_KEY, MAILERSEND_DOMAIN } from '$env/static/private'
import { passwordlessSignInSchema } from './schemas'

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('sessionId')

	if (sessionId) {
		const { session } = await validateSession(sessionId)

		if (session) return redirect(307, '/')
	}

	const form = await superValidate(valibot(passwordlessSignInSchema))

	return { form }
}

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, valibot(passwordlessSignInSchema))

		if (!form.valid) return fail(400, { form })

		const { email } = form.data

		const user = await db.query.users.findFirst({
			where: eq(users.email, email),
		})

		if (!user) {
			return message(form, 'user not found')
		}

		const otp = generateOTP()

		await db.insert(otpCodes).values({
			// @ts-expect-error TS2769  SOME BUG WITH DRIZZLE OR TS
			code: otp,
			userId: user.id,
			userEmail: user.email,
			expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 5), // 5 minutes
		})

		const mailerSend = new MailerSend({ apiKey: MAILERSEND_API_KEY })

		const sentFrom = new Sender(MAILERSEND_DOMAIN, 'tax-calc')

		const sentTo = [new Recipient(email, 'Recipient')]

		const emailParams = new EmailParams()
			.setFrom(sentFrom)
			.setTo(sentTo)
			.setSubject('otp')
			.setHtml(`otp: ${otp}`)

		try {
			await mailerSend.email.send(emailParams)
			return redirect(307, '/auth/passwordless-sign-in/otp')
		} catch (error) {
			console.error(error)
			return message(form, 'otp not sent, try again')
		}
	},
} satisfies Actions
