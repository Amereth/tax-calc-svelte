import { emailSchema } from '$lib/validation'
import * as v from 'valibot'

export const passwordlessSignInSchema = v.object({
	email: emailSchema,
})

export type PasswordlessSignInSchema = v.InferInput<
	typeof passwordlessSignInSchema
>
