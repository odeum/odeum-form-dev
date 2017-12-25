import React, { Component } from 'react'
import AutoForm from './AutoForm'

const countries = [
	{ value: '', label: 'Select your country' },
	{ value: 'Denmark', label: 'Denmark' },
	{ value: 'Germany', label: 'Germany' },
	{ value: 'Norway', label: 'Norway' },
	{ value: 'Sweden', label: 'Sweden' },
]

class AutoFormTester extends Component {
	constructor(props) {
		super(props)

		this.model = {
			firstname: {
				value: '',
				placeholder: 'Enter your firstname',
				validate: () => undefined
			},
			lastname: {
				value: '',
				placeholder: 'Enter your lastname',
				validate: () => undefined
			},
			email: {
				value: '',
				placeholder: 'Enter your e-mail',
				validate: () => undefined
			},
			password: {
				value: '',
				placeholder: 'Enter your password',
				validate: () => undefined
			},
			phone: {
				value: '',
				placeholder: 'Enter your phone',
				validate: () => undefined
			},
			country: {
				value: '',
				options: countries,
				validate: () => undefined
			},
			
			// age: '',
			// description: ''
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
					onChange={this.handleChange}
					debug
				/>
			</div>
		)
	}
}

export default AutoFormTester

/* 
		this.fieldtypes = {
			email: {
				name: 'email',
				component: Fields.Email,
			},

			password: {
				name: 'password',
				component: Fields.Password,
			},
		}


							name={'phone'}
							placeholder={'Enter your phone number'}
							validate={isPhoneNumber}

*/