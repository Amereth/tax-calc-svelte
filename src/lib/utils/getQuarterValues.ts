import type { Tax, Payment } from '$lib/server/schemas/types'

export const quarters = [1, 2, 3, 4] as const
export type Quarter = (typeof quarters)[number]

export const getQuarterValues = ({
	quarter,
	payments,
	esvs,
	eps,
}: {
	quarter: Quarter
	payments: Payment[]
	esvs: Tax[]
	eps: Tax[]
}) => {
	const monthsByQuarter: Record<Quarter, number[]> = {
		1: [1, 2, 3],
		2: [4, 5, 6],
		3: [7, 8, 9],
		4: [10, 11, 12],
	}

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

		if (!monthsByQuarter[quarter].includes(paymentMonth)) return acc

		const ep = eps.find((ep) => ep.date === payment.date.slice(0, 7))

		console.log({
			paymentMonth,
			quarter,
			test: monthsByQuarter[quarter].includes(paymentMonth),
			ep,
			eps,
		})

		if (!ep) return acc

		return acc + payment.sum * ep.sum
	}, 0)

	console.log('quarterEp: ', quarterEp)

	return {
		quarterSum,
		quarterEsv,
		quarterEp: Math.ceil(quarterEp),
	}
}
