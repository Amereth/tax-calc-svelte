import type { Tax, Payment } from '$lib/server/schemas/types'

export const getCurrentYearValues = <T extends Payment | Tax>(year: string, payments: T[]): T[] =>
	payments.filter((payment) => {
		const [paymentYear] = payment.date.split('-').map(Number)
		return paymentYear === +year
	})
