import { getPayments } from '$lib/server/utils/getPayments'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const payments = await getPayments(`${params.year}-01-01`, `${params.year}-12-31`)

	return {
		payments,
	}
}
