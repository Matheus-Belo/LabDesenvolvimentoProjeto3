export default function populateFormData(values, form = new FormData(), base = '') {
	const append = base.endsWith('[') ? ']' : ''

	Object.keys(values).forEach((key) => {
		let value = values[key];

		if (typeof value === 'string' ||
			typeof value === 'number' ||
			typeof value === 'boolean' ||
			value instanceof File ||
			value instanceof Blob ||
			value instanceof Date) {
			if (value instanceof Date)
				value = value.toISOString().split('T')[0]

			const fKey = `${base}${key}${append}`

			form.append(fKey, value)
		}
		else if (value && typeof value === 'object') {
			if (Array.isArray(value) && !value.length)
				form.append(`${base}${key}${append}[]`, "")

			const isArr = Array.isArray(value)

			populateFormData(value, form, `${base}${key}${append}${isArr ? '[' : '.'}`)
		}
	})
	return form;
}