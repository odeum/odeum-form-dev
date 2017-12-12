

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


export const validateField = (fieldName, value) => {
	const { errors, /* validation */ } = this.state
	let validationErrors = errors
	// let validation = validation

	// OLD
	let emailValid = this.state.emailValid
	let passwordValid = this.state.passwordValid

	switch (fieldName) {
		case 'email':
			emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
			validationErrors.email = emailValid ? '' : ' is invalid'
			break
		case 'password':
			passwordValid = value.length >= 8
			validationErrors.password = passwordValid ? '' : ' is too short'
			break
		default:
			break
	}

	this.setState({
		formErrors: validationErrors,
		emailValid: emailValid,
		passwordValid: passwordValid
	}, this.validateForm)
}

export const isEmail = (value) => {
	return null
}