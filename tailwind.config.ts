import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import { skeleton } from '@skeletonlabs/tw-plugin'
import { mainTheme, colors } from './src/configs/theme'
import forms from '@tailwindcss/forms'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			primary: {
				DEFAULT: colors.primary[500],
				...colors.primary,
			},
			secondary: {
				DEFAULT: colors.secondary[500],
				...colors.secondary,
			},
			tertiary: {
				DEFAULT: colors.tertiary[500],
				...colors.tertiary,
			},
			success: {
				DEFAULT: colors.success[500],
				...colors.success,
			},
			warning: {
				DEFAULT: colors.warning[500],
				...colors.warning,
			},
			error: {
				DEFAULT: colors.error[500],
				...colors.error,
			},
			surface: {
				DEFAULT: colors.surface[500],
				...colors.surface,
			},
		},
	},
	daisyui: {
		prefix: 'd-',
		themes: [
			{
				mainTheme: {
					primary: colors.primary[500],
					secondary: colors.secondary[500],
					accent: colors.tertiary[500],
					neutral: colors.surface[500],
					info: colors.primary[500],
					success: colors.success[500],
					warning: colors.warning[500],
					error: colors.error[500],
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
