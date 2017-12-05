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
					color={!this.props.isValid ? '#BE4F44' : undefined}
					focusColor={!this.props.isValid ? '#BE4F44' : undefined}
					onFocus={this.props.handleFocus}

					{...this.props}

				// onBlur={this.handleChange}
				// onMouseEnter={this.handleMouse('Enter')}
				// onMouseLeave={this.handleMouse('Leave')}
				// required, placeholder, disabled, defaultValue, readOnly
				/>
			</div>
		)
	}
}

export const Password = (props) => {
	const fieldId = 'password'
	return (
		<StyledInput
			type={fieldId}
			// name={fieldId}
			// value={props.value}
			innerRef={props.createInputRef ? props.createInputRef(fieldId) : null}
			onChange={props.handleChange}
			color={!props.isValid ? '#BE4F44' : undefined}
			focusColor={!props.isValid ? '#BE4F44' : undefined}
			onFocus={props.handleFocus}

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

			{...props}
		/>
	)
}