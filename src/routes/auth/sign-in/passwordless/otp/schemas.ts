import * as v from 'valibot'

export const otpSchema = v.object({
	code: v.pipe(v.string(), v.length(6), v.regex(/^[0-9]*$/)),
})

export type OtpSchema = v.InferInput<typeof otpSchema>
