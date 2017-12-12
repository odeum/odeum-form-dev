/* 

Module with multiple custom validators. All validator functions can be passed as a single prop
through validate={customValidator} or composed of multiple validators through composeValidators(validator1, validator2 ... validatorN)

*/

// Composes multiple custom validator functions into one passable function
export const composeValidators = (...validators) => (value) =>
	validators.reduce((error, validator) => error || validator(value), undefined)

// Field is required
export const required = (value) => 
	(value ? undefined : 'Required')

// Field must be a number
export const mustBeNumber = value => 
	(isNaN(value) ? "Must be a number" : undefined)

// Field must be a valid e-mail address
export const isEmail = (value) => 
	(value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? undefined : 'Invalid e-mail')

// Field must have a minimum value
export const minValue = (min) => (value) =>
	isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`

// Field must be less than a maximum value
export const maxValue = (max) => (value) =>
	isNaN(value) || value <= max ? undefined : `Should be less than ${max + 1}`

// Field should be longer than a minimum number of characters
export const minChars = (min) => (value) => 
	value.length >= min ? undefined : `Should be minimum ${min} characters`

// Field should be less than a maximum number of characters
export const maxChars = (max) => (value) => 
	value.length <= max ? undefined : `Should be less than ${max + 1} characters`

// Doesn't work
export const formattedDate = (value) =>
	(value.match(/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/) ? undefined : 'Incorrect formatted date')


// Date / Birthday
// var input = '29-02-1847'

// var pattern = /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/

