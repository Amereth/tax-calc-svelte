import type { Ep } from '$lib/server/schemas/ep'
import type { Esv } from '$lib/server/schemas/esv'
import type { Payment } from '$lib/server/schemas/payments'

export const getCurrentYearValues = <T extends Payment | Esv | Ep>(
	year: string,
	payments: T[],
): T[] =>
	payments.filter((payment) => {
		const [paymentYear] = payment.date.split('-').map(Number)
		return paymentYear === +year
	})
