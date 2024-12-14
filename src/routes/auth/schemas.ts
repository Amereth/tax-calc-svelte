import { emailSchema, passwordSchema } from '$lib/validation'
import * as v from 'valibot'

export const signInSchema = v.object({
	email: emailSchema,
	password: passwordSchema,
})

export type SignInSchema = v.InferInput<typeof signInSchema>

export const passwordlessSchema = v.object({ email: emailSchema })
