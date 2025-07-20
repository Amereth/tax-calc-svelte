import type { Config } from 'tailwindcss'
import { skeleton } from '@skeletonlabs/tw-plugin'
import { mainTheme, colors } from './src/configs/theme'
import forms from '@tailwindcss/forms'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
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
	},
	darkMode: 'class',
	plugins: [
		forms,
		skeleton({
			themes: {
				custom: [mainTheme],
			},
		}),
	],
} satisfies Config as Config
