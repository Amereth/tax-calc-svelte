import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin'

export const colors = {
	primary: {
		50: '#fff6dd',
		100: '#fff3d2',
		200: '#fff0c7',
		300: '#ffe7a5',
		400: '#ffd562',
		500: '#ffc31f',
		600: '#e6b01c',
		700: '#bf9217',
		800: '#997513',
		900: '#7d600f',
	},
	secondary: {
		50: '#f8e8ef',
		100: '#f6e0ea',
		200: '#f4d8e4',
		300: '#edc1d4',
		400: '#e093b4',
		500: '#d36494',
		600: '#be5a85',
		700: '#9e4b6f',
		800: '#7f3c59',
		900: '#673149',
	},
	tertiary: {
		50: '#f3f5f6',
		100: '#eff1f2',
		200: '#e6e9ea',
		300: '#c6cfd3',
		400: '#a9b0b1',
		500: '#aebbc0',
		600: '#9da8ad',
		700: '#838c90',
		800: '#687073',
		900: '#555c5e',
	},
	success: {
		50: '#e9f7ed',
		100: '#e2f4e7',
		200: '#dbf1e1',
		300: '#c5e9ce',
		400: '#9ad9aa',
		500: '#6fc885',
		600: '#64b478',
		700: '#539664',
		800: '#437850',
		900: '#366241',
	},
	warning: {
		50: '#ffebd9',
		100: '#ffe5cc',
		200: '#ffdebf',
		300: '#ffca99',
		400: '#ffa34d',
		500: '#ff7b00',
		600: '#e66f00',
		700: '#bf5c00',
		800: '#994a00',
		900: '#7d3c00',
	},
	error: {
		50: '#ffe1e1',
		100: '#ffd7d7',
		200: '#ffcdcd',
		300: '#ffafaf',
		400: '#ff7474',
		500: '#ff3838',
		600: '#e63232',
		700: '#bf2a2a',
		800: '#992222',
		900: '#7d1b1b',
	},
	surface: {
		50: '#ebe3db',
		100: '#e4dacf',
		200: '#ddd1c3',
		300: '#c9b59f',
		400: '#a07e56',
		500: '#77460e',
		600: '#6b3f0d',
		700: '#59350b',
		800: '#472a08',
		900: '#3a2207',
	},
} as const

export const mainTheme: CustomThemeConfig = {
	name: 'main-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '8px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '2px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '0 0 0',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #ffc31f
		'--color-primary-50': '255 246 221', // #fff6dd
		'--color-primary-100': '255 243 210', // #fff3d2
		'--color-primary-200': '255 240 199', // #fff0c7
		'--color-primary-300': '255 231 165', // #ffe7a5
		'--color-primary-400': '255 213 98', // #ffd562
		'--color-primary-500': '255 195 31', // #ffc31f
		'--color-primary-600': '230 176 28', // #e6b01c
		'--color-primary-700': '191 146 23', // #bf9217
		'--color-primary-800': '153 117 19', // #997513
		'--color-primary-900': '125 96 15', // #7d600f
		// secondary | #d36494
		'--color-secondary-50': '248 232 239', // #f8e8ef
		'--color-secondary-100': '246 224 234', // #f6e0ea
		'--color-secondary-200': '244 216 228', // #f4d8e4
		'--color-secondary-300': '237 193 212', // #edc1d4
		'--color-secondary-400': '224 147 180', // #e093b4
		'--color-secondary-500': '211 100 148', // #d36494
		'--color-secondary-600': '190 90 133', // #be5a85
		'--color-secondary-700': '158 75 111', // #9e4b6f
		'--color-secondary-800': '127 60 89', // #7f3c59
		'--color-secondary-900': '103 49 73', // #673149
		// tertiary | #aebbc0
		'--color-tertiary-50': '243 245 246', // #f3f5f6
		'--color-tertiary-100': '239 241 242', // #eff1f2
		'--color-tertiary-200': '235 238 239', // #ebeeef
		'--color-tertiary-300': '223 228 230', // #dfe4e6
		'--color-tertiary-400': '198 207 211', // #c6cfd3
		'--color-tertiary-500': '174 187 192', // #aebbc0
		'--color-tertiary-600': '157 168 173', // #9da8ad
		'--color-tertiary-700': '131 140 144', // #838c90
		'--color-tertiary-800': '104 112 115', // #687073
		'--color-tertiary-900': '85 92 94', // #555c5e
		// success | #6fc885
		'--color-success-50': '233 247 237', // #e9f7ed
		'--color-success-100': '226 244 231', // #e2f4e7
		'--color-success-200': '219 241 225', // #dbf1e1
		'--color-success-300': '197 233 206', // #c5e9ce
		'--color-success-400': '154 217 170', // #9ad9aa
		'--color-success-500': '111 200 133', // #6fc885
		'--color-success-600': '100 180 120', // #64b478
		'--color-success-700': '83 150 100', // #539664
		'--color-success-800': '67 120 80', // #437850
		'--color-success-900': '54 98 65', // #366241
		// warning | #ff7b00
		'--color-warning-50': '255 235 217', // #ffebd9
		'--color-warning-100': '255 229 204', // #ffe5cc
		'--color-warning-200': '255 222 191', // #ffdebf
		'--color-warning-300': '255 202 153', // #ffca99
		'--color-warning-400': '255 163 77', // #ffa34d
		'--color-warning-500': '255 123 0', // #ff7b00
		'--color-warning-600': '230 111 0', // #e66f00
		'--color-warning-700': '191 92 0', // #bf5c00
		'--color-warning-800': '153 74 0', // #994a00
		'--color-warning-900': '125 60 0', // #7d3c00
		// error | #ff3838
		'--color-error-50': '255 225 225', // #ffe1e1
		'--color-error-100': '255 215 215', // #ffd7d7
		'--color-error-200': '255 205 205', // #ffcdcd
		'--color-error-300': '255 175 175', // #ffafaf
		'--color-error-400': '255 116 116', // #ff7474
		'--color-error-500': '255 56 56', // #ff3838
		'--color-error-600': '230 50 50', // #e63232
		'--color-error-700': '191 42 42', // #bf2a2a
		'--color-error-800': '153 34 34', // #992222
		'--color-error-900': '125 27 27', // #7d1b1b
		// surface | #77460e
		'--color-surface-50': '235 227 219', // #ebe3db
		'--color-surface-100': '228 218 207', // #e4dacf
		'--color-surface-200': '221 209 195', // #ddd1c3
		'--color-surface-300': '201 181 159', // #c9b59f
		'--color-surface-400': '160 126 86', // #a07e56
		'--color-surface-500': '119 70 14', // #77460e
		'--color-surface-600': '107 63 13', // #6b3f0d
		'--color-surface-700': '89 53 11', // #59350b
		'--color-surface-800': '71 42 8', // #472a08
		'--color-surface-900': '58 34 7', // #3a2207
	},
}
