import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import { skeleton } from '@skeletonlabs/tw-plugin'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	plugins: [daisyui, skeleton],
} satisfies Config as Config
