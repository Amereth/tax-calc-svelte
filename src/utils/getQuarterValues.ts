import type { Tax, Payment } from '$lib/server/schemas/types'

export const getQuarterValues = ({
	quarter,
	payments,
	esvs,
	eps,
}: {
	quarter: number
	payments: Payment[]
	esvs: Tax[]
	eps: Tax[]
}) => {
	const quarterSum = payments.reduce((acc, payment) => {
		const [, paymentMonth] = payment.date.split('-').map(Number)

		if (paymentMonth > quarter * 3) return acc
		if (paymentMonth < quarter * 3 - 2) return acc

		return acc + payment.sum
	}, 0)

	const quarterEsv = esvs.reduce((acc, esv) => {
		const [, paymentMonth] = esv.date.split('-').map(Number)

		if (paymentMonth > quarter * 3) return acc
		if (paymentMonth < quarter * 3 - 2) return acc

		return acc + esv.sum
	}, 0)

	const quarterEp = payments.reduce((acc, payment) => {
		const [, paymentMonth] = payment.date.split('-').map(Number)

		if (paymentMonth > quarter * 3) return acc
		if (paymentMonth < quarter * 3 - 2) return acc

		const ep = eps.find((ep) => ep.date === payment.date.slice(0, 7))

		if (!ep) return acc

		return acc + payment.sum * ep.sum
	}, 0)

	return {
		quarterSum,
		quarterEsv,
		quarterEp: Math.ceil(quarterEp),
	}
}
