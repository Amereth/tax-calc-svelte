export const toObject = <T = unknown>(formData: FormData) =>
	Object.fromEntries(formData.entries()) as T
