import { getYears } from '$lib/server/utils/getYears'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async () => {
	const years = await getYears()

	return { years }
}
