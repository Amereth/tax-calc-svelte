import { getYears } from '$lib/server/utils/getYears'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async () => {
	const years = await getYears()

	if (!years.includes(new Date().getFullYear().toString())) {
		years.push(new Date().getFullYear().toString())
	}

	return { years }
}
