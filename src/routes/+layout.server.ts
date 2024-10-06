import { getPayments } from '$lib/server/utils/getPayments'
import type { PageServerLoad } from './payments/[year]/$types'

export const load: PageServerLoad = async () => {
	const payments = await getPayments()

	return {
		payments,
	}
}
