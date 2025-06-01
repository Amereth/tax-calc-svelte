export const formatter = (currency: string) =>
	new Intl.NumberFormat('uk-UA', {
		style: 'currency',
		currency,
		currencyDisplay: 'narrowSymbol',
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	})
