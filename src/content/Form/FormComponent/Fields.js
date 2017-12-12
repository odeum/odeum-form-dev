import React, { Component } from 'react'
// import Field from './Field'
import { StyledInput } from './FormStyles'

/* 
Common Field Components wrapping all the generic props and methods from the Generic Field Component.
Email
Password
FirstName
LastName
Address
Zip
Country
Phone
Company
Birthday
Gender
Date
*/

export class Email extends Component {
	render() {
		const fieldId = 'email'
		return (
			<div>
				<StyledInput
					type={fieldId}
					// name={fieldId}
					// value={this.props.value}
					innerRef={this.props.createInputRef ? this.props.createInputRef(fieldId) : null}
					onChange={this.props.handleChange}
					validate={this.props.validate} // New Kid
					color={!this.props.isValid ? '#BE4F44' : undefined}
					focusColor={!this.props.isValid ? '#BE4F44' : undefined}
					onFocus={this.props.handleFocus}
					autoComplete={this.props.autoComplete}
					onBlur={this.props.handleBlur}
					onMouseEnter={this.props.handleMouseEnter}
					onMouseLeave={this.props.handleMouseLeave}
					required={this.props.required}
					disabled={this.props.disabled} 
					readOnly={this.props.readOnly}
					{...this.props}
				/>
			</div>
		)
	}
}

export const Password = (props) => {
	const fieldId = 'password'
	// console.log(props.validate)
	return (
		<StyledInput
			type={fieldId}
			// name={fieldId}
			// value={props.value}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			validate={props.validate} // New Kid
			color={!props.isValid ? '#BE4F44' : undefined}
			focusColor={!props.isValid ? '#BE4F44' : undefined}
			onFocus={props.handleFocus}
			autoComplete={props.autoComplete}

			{...props}
		/>
	)
}

export const Phone = (props) => {
	const fieldId = 'phone'
	return (
		<StyledInput
			type={'tel'}
			// name={fieldId}
			// value={props.value}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			color={!props.isValid ? '#BE4F44' : undefined}
			focusColor={!props.isValid ? '#BE4F44' : undefined}
			onFocus={props.handleFocus}
			autoComplete={props.autoComplete}

			{...props}
		/>
	)
}