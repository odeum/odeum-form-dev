import React from 'react'
// import Field from './Field'
import { StyledInput, StyledSelect, StyledTextArea } from './FormStyles'
import { ToggleSwitch } from 'odeum-ui'


/* 
Common Field Components wrapping all the generic props and methods from the Generic Field Component.
<input>
Zip
Company
Birthday
Country
Gender
Checkbox

<select>
Select

<textarea>
<option>
<optgroup>
<fieldset>
<label>
*/

export const Email = (props) => {
	const fieldId = 'email'
	return (
		<StyledInput
			type={fieldId}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			{...props}
		/>
	)
}

export const Password = (props) => {
	const fieldId = 'password'
	return (
		<StyledInput
			type={fieldId}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			{...props}
		/>
	)
}

export const Phone = (props) => {
	const fieldId = 'phone'
	return (
		<StyledInput
			type={'tel'}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			{...props}
		/>
	)
}

export const FirstName = (props) => {
	const fieldId = 'text'
	return (
		<StyledInput
			type={fieldId}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			{...props}
		/>
	)
}

export const LastName = (props) => {
	const fieldId = 'text'
	return (
		<StyledInput
			type={fieldId}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			{...props}
		/>
	)
}

export const Address = (props) => {
	const fieldId = 'text'
	return (
		<StyledInput
			type={fieldId}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			{...props}
		/>
	)
}

export const Number = (props) => {
	const fieldId = 'number'
	return (
		<StyledInput
			type={fieldId}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			{...props}
		/>
	)
}

export const Select = (props) => {
	const fieldId = 'select'
	return (
		<StyledSelect
			type={fieldId}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			{...props}
		>
			{props.children}
		</StyledSelect>
	)
}

export const TextArea = (props) => {
	const fieldId = 'textarea'
	return (
		<StyledTextArea
			type={fieldId}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			{...props}
		>
			{/* {props.children} */}
		</StyledTextArea>
	)
}

export const Date = (props) => {
	const fieldId = 'date'
	return (
		<StyledInput
			type={fieldId}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			{...props}
		/>
	)
}

// TODO: Checkbox do not work
export const Checkbox = (props) => {
	const fieldId = 'checkbox'
	return (
		<StyledInput
			type={fieldId}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			{...props}
		/>
	)
}

export const Switch = (props) => {
	const fieldId = 'checkbox'
	return (
		<ToggleSwitch			
			type={"square"} 
			size={"small"} 
			// defaultChecked={false}
			checked={false}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			{...props}
		/>
	)
}



/*
INPUT TYPES:
button
checkbox
color
date
datetime-local
email
file
hidden
image
month
number
password
radio
range
reset
search
submit
tel
text
time
url
week
*/


/* TEMPLATE:

export const Password = (props) => {
	const fieldId = 'password'
	// console.log(props.validate)
	return (
		<StyledInput
			type={fieldId}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			// name={fieldId}
			// value={props.value}
			// validate={props.validate}
			// color={!props.isValid ? '#BE4F44' : undefined}
			// focusColor={!props.isValid ? '#BE4F44' : undefined}
			// onFocus={props.handleFocus}
			// autoComplete={props.autoComplete}
			// onBlur={props.handleBlur}
			// onMouseEnter={props.handleMouseEnter}
			// onMouseLeave={props.handleMouseLeave}
			// required={props.required}
			// disabled={props.disabled}
			// readOnly={props.readOnly}
			{...props}
		/>
	)
}

*/