import React, { Component } from 'react'
import AutoForm from './AutoForm'
import countries from './countries'
// import * as validator from '../FormComponent/Validators'
import {
	composeValidators,
	isEmail,
	minChars,
	isPhoneNumber,
	hasLower,
	hasUpper,
	hasSymbol,
	hasNumber,
	required, 
	// auto, 
	mustBeLetters,
	// maxChars,
	// formattedDate, 
	// mustBeNumber,
	// mustBePositive,
	mustBeEqualTo,
	// mustBeNegative, 
} from '../FormComponent/Validators' // odeum-form-validators

// model, options and validators can all be imported from external module(s)
class AutoFormTester extends Component {
	constructor(props) {
		super(props)

		this.model = {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			phone: '',
			country: '',
			// age: '',
			// description: ''
		}

		this.options = {
			country: countries
		}

		this.validators = {
			firstname: composeValidators(mustBeLetters, mustBeEqualTo('Christian')),
			lastname: mustBeLetters,
			email: isEmail,
			password: composeValidators(minChars(8), hasLower, hasUpper, hasSymbol, hasNumber),
			phone: isPhoneNumber,
			country: composeValidators(required, mustBeEqualTo('Denmark')),			
		}

		this.state = {
			values: '',
			errors: '',
			isFormValid: false,
			isSubmitting: false, 
			reset: false,
		}
	}

	render() {
		return (
			<div style={{ width: '50%' }}>
				<h1>AutoForm component test</h1>
				<p>Please fill out the following form fields:</p>

				<AutoForm 
					model={this.model} 
					options={this.options}
					validators={this.validators}
					// onChange={this.handleChange}
					focusfield={'firstname'}
					// onSubmit={this.handleSubmit}
					// onReset={this.handleReset}
					// reset={reset}
					// onError={this.handleError}
					// onChange={this.handleChange}
					// allowKeys={{ 'esc': true, 'enter': true }}
					debug
				/>
			</div>
		)
	}
}

export default AutoFormTester
