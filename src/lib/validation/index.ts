import * as v from 'valibot'

export const emailSchema = v.pipe(v.string(), v.email())

export const passwordSchema = v.pipe(
	v.string(),
	v.minLength(8, 'Your password is too short.'),
	v.maxLength(30, 'Your password is too long.'),
	v.regex(/[a-z]/, 'Your password must contain a lowercase letter.'),
	v.regex(/[A-Z]/, 'Your password must contain a uppercase letter.'),
	v.regex(/[0-9]/, 'Your password must contain a number.'),
	v.regex(/[!@#$%^&*()]/, 'Your password must contain a symbol.'),
)
