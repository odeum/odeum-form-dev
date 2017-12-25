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

class AutoFormTester extends Component {
	constructor(props) {
		super(props)

		this.model = {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			phone: '',
			country: {
				options: countries
			},
			
			// age: '',
			// description: ''
		}

		this.validators = {
			firstname: composeValidators(mustBeLetters, mustBeEqualTo('Christian')),
			lastname: mustBeLetters,
			email: isEmail,
			password: composeValidators(minChars(8), hasLower, hasUpper, hasSymbol, hasNumber),
			phone: isPhoneNumber,
			country: required,			
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
			<div>
				<h1>AutoForm component test</h1>
				<p>Please fill out the following form fields:</p>

				<AutoForm 
					model={this.model} 
					validators={this.validators}
					// onChange={this.handleChange}
					debug
				/>
			</div>
		)
	}
}

export default AutoFormTester
