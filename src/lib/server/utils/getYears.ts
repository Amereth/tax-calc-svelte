import { getPayments } from './getPayments'

export const getYears = async (): Promise<string[]> => {
	const payments = await getPayments()

	const years = payments.reduce<Set<string>>(
		(acc, payment) => acc.add(payment.date.split('-')[0]),
		new Set(),
	)

	return [...years]
}
