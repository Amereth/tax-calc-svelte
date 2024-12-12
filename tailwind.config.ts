import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import { skeleton } from '@skeletonlabs/tw-plugin'
import { theme } from './src/configs/theme'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	daisyui: {
		prefix: 'd-',
	},
	darkMode: 'class',
	plugins: [
		daisyui,
		skeleton({
			themes: {
				custom: [theme],
			},
		}),
	],
} satisfies Config as Config
