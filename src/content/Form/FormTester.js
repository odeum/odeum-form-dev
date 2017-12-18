import React, { Component } from 'react'
// import { ButtonPanel, Button } from 'odeum-ui'
import Form from './FormComponent/Form' // odeum-form
// import Field from './FormComponent/Field'
import { Email, Password, Phone, Select } from './FormComponent/Fields' // odeum-form
// import RenderButtons from './FormComponent/RenderButtons'
import { FormErrors, FieldError } from './FormErrors'

import {
	composeValidators,
	isEmail,
	minChars,
	isPhoneNumber, 
	hasLower,
	hasUpper,
	hasSymbol,
	hasNumber,
	// mustBeLetters,
	// maxChars,
	// formattedDate, 
	// mustBeNumber,
} from './FormComponent/Validators' // odeum-form-validators


// App or other higher level component composing the form and issues the form state and utility methods for submit ...
class FormTester extends Component {

	constructor(props) {
		super(props)

		this.model = {
			values: {
				// firstname: '',
				// lastname: '',
				email: '',
				password: '',
				country: '',
				phone: '',
				// phone2: '',
			}
		}

		this.state = {
			values: '',
			errors: ''
		}
	}

	handleChange = (values) => {
		this.setState({ values: values })
	}

	handleError = (errors) => {
		this.setState({ errors: errors })
	}

	handleSubmit = (data) => {
		console.log('Submitting data ...', data)
	}

	render() {
		const { errors } = this.state
		return (
			<div>
				<h1>Form component test</h1>
				<p>Please fill out the following form fields:</p>
				<div style={{ width: '100%' }}>
					<Form
						focusfield={'email'}
						model={this.model.values}
						onSubmit={this.handleSubmit}
						onError={this.handleError}
						onChange={this.handleChange}
						styles={''}
						debug={true}
						allowKeys={{ 'esc': true, 'enter': true }}
					>
						<Email
							name={'email'}
							placeholder={'Enter your mail address ... '}
							validate={isEmail}
						/>
						<FieldError error={errors['email']} name={'email'}/>						
						<Password
							name={'password'}
							placeholder={'Enter your password ... '}
							validate={composeValidators(minChars(8), hasLower, hasUpper, hasSymbol, hasNumber)}
						/>
						<Phone
							name={'phone'}
							placeholder={'Enter your phone number ... '}
							validate={isPhoneNumber} 
							// validate={composeValidators(mustBeLetters, minChars(8))}
							// validate={formattedDate}
							// validate={maxChars(10)}
							// validate={mustBeNumber}
						/>
						{/* <Field
							type={'tel'}
							name={'phone3'}
							placeholder={'Enter your phone number 3 ... '}
							validate={isPhoneNumber} 
						/> */}
						<Select 
							name={'country'} 
							// value={this.model.values.country}
						>
							<option value={'denmark'}>Denmark</option>
							<option value={'germany'}>Germany</option>
							<option value={'norway'}>Norway</option>
							<option value={'sweden'}>Sweden</option>
						</Select>
						<Phone
							name={'phone2'}
							placeholder={'Enter your phone number 2 ... '}
							value={this.state.values['country']}
							readOnly
						/>
						<div name={'div'}>Unwanted DOM child that eventually will be a styling part.</div>
					</Form>
				</div>
				<FormErrors errors={this.state.errors} />
				{errors['email']}
			</div>
		)
	}
}

export default FormTester
