import { getEps } from '$lib/server/utils/getEps'
import { getEsvs } from '$lib/server/utils/getEsv'
import { getPayments } from '$lib/server/utils/getPayments'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const [payments, esvs, eps] = await Promise.all([getPayments(), getEsvs(), getEps()])

	return {
		payments,
		esvs,
		eps,
	}
}
