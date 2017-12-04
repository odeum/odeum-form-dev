import React, { Component } from 'react'
import Field from './Field'


/* 
Common Field Components wrapping all the generic props and methods from the Generic Field Component.

*/
export class Email extends Component {

	render() {
		const fieldId = 'email'
		return (
			<div>
				<Field
					type={fieldId}
					name={fieldId}
					value={this.props.value}
					// innerRef={this.props.createInputRef(fieldId)}
					onChange={this.props.handleChange}
					// onChange={this.handleChange}

					// color={!this.state.emailValid ? '#BE4F44' : undefined}
					color={!this.props.isValid ? '#BE4F44' : undefined}
					// focusColor={!this.state.emailValid ? '#BE4F44' : undefined}
					focusColor={!this.props.isValid ? '#BE4F44' : undefined}
					// onFocus={this.props.handleFocus}

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
		<Field
			type={fieldId}
			name={fieldId}
			value={props.value}
			// innerRef={this.props.createInputRef(fieldId)}
			onChange={props.handleChange}
			// onChange={this.handleChange}

			// color={!this.state.emailValid ? '#BE4F44' : undefined}
			color={!props.isValid ? '#BE4F44' : undefined}
			// focusColor={!this.state.emailValid ? '#BE4F44' : undefined}
			focusColor={!props.isValid ? '#BE4F44' : undefined}
			// onFocus={this.props.handleFocus}

			{...props}
		/>

	)
}