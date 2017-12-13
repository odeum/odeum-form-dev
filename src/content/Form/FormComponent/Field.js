import React, { Component } from 'react'
import { StyledInput } from './FormStyles'

// Called by Common Field Component
class Field extends Component {
	render() {
		const fieldId = 'email'
		return (
			<div>
				<StyledInput
					type={this.props.type}
					// name={fieldId}
					// value={this.props.value}
					innerRef={this.props.createInputRef ? this.props.createInputRef(fieldId) : null}
					onChange={this.props.handleChange}
					// validate={this.props.validate}
					// color={!this.props.isValid ? '#BE4F44' : undefined}
					// focusColor={!this.props.isValid ? '#BE4F44' : undefined}
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

export default Field

