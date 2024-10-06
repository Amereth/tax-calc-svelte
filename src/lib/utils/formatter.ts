export const formatter = (currency: string) =>
	new Intl.NumberFormat('uk-UA', {
		style: 'currency',
		currency,
		currencyDisplay: 'narrowSymbol',
		maximumFractionDigits: 0,
	})
