import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import { skeleton } from '@skeletonlabs/tw-plugin'
import { mainTheme } from './src/configs/theme'
import forms from '@tailwindcss/forms'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	daisyui: {
		prefix: 'd-',
		themes: [
			{
				mainTheme: {
					primary: '#84bdf5',
					secondary: '#d36494',
					accent: '#aebbc0',
					neutral: '#371d3a',
					info: '#aebbc0',
					success: '#6fc885',
					warning: '#fcfa19',
					error: '#ff3838',
				},
			},
		],
	},
	darkMode: 'class',
	plugins: [
		forms,
		daisyui,
		skeleton({
			themes: {
				custom: [mainTheme],
			},
		}),
	],
} satisfies Config as Config
