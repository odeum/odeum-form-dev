/* 
odeum-form-validators

Module with multiple predefined custom validators. All validator functions can be passed as a single prop
through validate={customValidator} or composed of multiple validators through composeValidators(validator1, validator2 ... validatorN)

Developers can create own custom validators and just use composeValidators() for composition

*/

// Composes multiple custom validator functions into one passable function
export const composeValidators = (...validators) => (value) =>
	validators.reduce((error, validator) => error || validator(value), undefined)

// Field is auto validated
export const auto = (value) => 
	(value !== '' ? undefined : 'Missing value')

// Field is required
export const required = (value) => 
	(value ? undefined : 'Required')


// Field must be a number
export const mustBeNumber = (value) => 
	(isNaN(value) ? "Must be a number" : undefined)

// Field must be a positive number
export const mustBePositive = (value) => 
	(value <= 0 ? "Must be a positive number" : undefined)

// Field must be a negative number
export const mustBeNegative = (value) => 
	(value >= 0 ? "Must be a negative number" : undefined)


// Field must only contain letters
export const mustBeLetters = (value) =>
	(value.match(/^[a-z]+$/i) ? undefined : 'Must only contain letters')


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
	

// TODO: Field must be a formatted date dd-mm-yyyy - dd/mm/yyyy - (non localized)
export const formattedDate = (value) =>
	(value.match(/^(?: (?: 31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/) ? undefined : 'Incorrect formatted date')
	

// Field must include a lowercase alpha
export const hasLower = (value) =>
	(value.match(/[a-z]/) ? undefined : 'Missing lowercase character')
	

// Field must include an uppercase alpha
export const hasUpper = (value) =>
	(value.match(/[A-Z]/) ? undefined : 'Missing uppercase character')


// Field must include a symbol
export const hasSymbol = (value) =>
	(value.match(/[-!$§#€%^&*()_+|~=`{}[\]:";'<>?,./]/) ? undefined : 'Missing symbol')


// Field must include a number
export const hasNumber = (value) =>
	(value.match(/^(?=.*\d+).*$/) ? undefined : 'Missing number')
	

// Field must be a valid phone number	
export const isPhoneNumber = (value) => 
	(value.match(/^[+]?[(]?[0-9]{2,3}[)]?[-\s.]?[0-9]{2,3}[-\s.]?[0-9\s.]{4,6}$/im) ? undefined : 'Invalid phone number')

/*
Valid phone number formats:

(123) 456-7890
(123)456-7890
123-456-7890
123.456.7890
1234567890
+31636363634
075-63546725
+4522680880

To be added:
22680880
22 68 08 80
+45 22 68 08 80

*/

/* 

Add validators for:

isName (must be letters)
isCountry

*/