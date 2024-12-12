import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin'

export const theme: CustomThemeConfig = {
	name: 'my-custom-theme',
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
		// primary | #84bdf5
		'--color-primary-50': '237 245 254', // #edf5fe
		'--color-primary-100': '230 242 253', // #e6f2fd
		'--color-primary-200': '224 239 253', // #e0effd
		'--color-primary-300': '206 229 251', // #cee5fb
		'--color-primary-400': '169 209 248', // #a9d1f8
		'--color-primary-500': '132 189 245', // #84bdf5
		'--color-primary-600': '119 170 221', // #77aadd
		'--color-primary-700': '99 142 184', // #638eb8
		'--color-primary-800': '79 113 147', // #4f7193
		'--color-primary-900': '65 93 120', // #415d78
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
		// warning | #fcfa19
		'--color-warning-50': '255 254 221', // #fffedd
		'--color-warning-100': '254 254 209', // #fefed1
		'--color-warning-200': '254 254 198', // #fefec6
		'--color-warning-300': '254 253 163', // #fefda3
		'--color-warning-400': '253 252 94', // #fdfc5e
		'--color-warning-500': '252 250 25', // #fcfa19
		'--color-warning-600': '227 225 23', // #e3e117
		'--color-warning-700': '189 188 19', // #bdbc13
		'--color-warning-800': '151 150 15', // #97960f
		'--color-warning-900': '123 123 12', // #7b7b0c
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
		// surface | #371d3a
		'--color-surface-50': '225 221 225', // #e1dde1
		'--color-surface-100': '215 210 216', // #d7d2d8
		'--color-surface-200': '205 199 206', // #cdc7ce
		'--color-surface-300': '175 165 176', // #afa5b0
		'--color-surface-400': '115 97 117', // #736175
		'--color-surface-500': '55 29 58', // #371d3a
		'--color-surface-600': '50 26 52', // #321a34
		'--color-surface-700': '41 22 44', // #29162c
		'--color-surface-800': '33 17 35', // #211123
		'--color-surface-900': '27 14 28', // #1b0e1c
	},
}
