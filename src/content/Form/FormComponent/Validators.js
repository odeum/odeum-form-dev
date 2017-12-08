

export const required = (value) => {
	return (value ? undefined : 'Required')
}

export const required2 = (value) => (value ? undefined : 'Required')

export const mustBeNumber = (value) => {
	return (isNaN(value) ? 'Must be a number' : undefined)
}


export const mustBeNumber2 = (value) => (isNaN(value) ? 'Must be a number' : undefined)

export const minValue = (min) => (value) =>
	isNaN(value) || value >= (min ? undefined : `Should be greater than ${min}`)

export const minChars = (min) => (value) => {
	return value.length >= (min ? undefined : `Should be longer than ${min} characters`)
}

export const composeValidators = (...validators) => (value) =>
	validators.reduce((validator) => validator(value), undefined)

export const composeValidators2 = (...validators) => (value) =>
	validators.reduce((error, validator) => error || validator(value), undefined)


