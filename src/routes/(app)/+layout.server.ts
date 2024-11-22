import { getYears } from '$lib/server/utils/getYears'
import type { PageServerLoad } from './payments/[year]/$types'

export const load: PageServerLoad = async () => {
	const years = await getYears()

	return { years }
}
