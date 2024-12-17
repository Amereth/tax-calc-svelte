import { emailSchema, passwordSchema } from '$lib/validation'
import * as v from 'valibot'

export const signInSchema = v.object({
	email: emailSchema,
	password: passwordSchema,
})

export type SignInSchema = v.InferInput<typeof signInSchema>

export const passwordlessSignInSchema = v.object({ email: emailSchema })

export type PasswordlessSignInSchema = v.InferInput<
	typeof passwordlessSignInSchema
>
