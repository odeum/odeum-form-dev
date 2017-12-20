import React, { Component } from 'react'
// import { ButtonPanel, Button } from 'odeum-ui'
import Form from './FormComponent/Form' // odeum-form
// import Field from './FormComponent/Field'
import { FirstName, LastName, Number, Email, Password, Phone, Select, TextArea } from './FormComponent/Fields' // odeum-form
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
	// required, 
	// auto, 
	mustBeLetters,
	maxChars,
	// formattedDate, 
	mustBeNumber,
	mustBePositive, 
	// mustBeNegative, 
} from './FormComponent/Validators' // odeum-form-validators


// App or other higher level component composing the form and issues the form state and utility methods for submit ...
class FormTester extends Component {

	constructor(props) {
		super(props)

		this.model = {
			values: {
				firstname: '',
				lastname: '',
				email: '',
				password: '',
				country: '',
				phone: '',
				age: '',
				description: ''
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

				<div style={{ width: '50%' }}>
					<Form
						focusfield={'firstname'}
						model={this.model.values}
						onSubmit={this.handleSubmit}
						onError={this.handleError}
						onChange={this.handleChange}
						styles={''}
						debug={true}
						allowKeys={{ 'esc': true, 'enter': true }}
					>

						<FirstName
							name={'firstname'}
							placeholder={'Enter your firstname'}
							validate={mustBeLetters}
							width={'300px'}
						/>

						<LastName
							name={'lastname'}
							placeholder={'Enter your lastname'}
							validate={mustBeLetters}
							width={'300px'}
						/>

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
							placeholder={'Enter your phone number'}
							validate={isPhoneNumber}
							width={'220px'}
						/>
						
						<Select 
							name={'country'}
						>
							<option value={''}>Select your country</option>
							<option value={'Denmark'}>Denmark</option>
							<option value={'Germany'}>Germany</option>
							<option value={'Norway'}>Norway</option>
							<option value={'Sweden'}>Sweden</option>
						</Select>

						<Phone
							name={'phone2'}
							placeholder={'Enter your phone number 2 ... '}
							value={this.state.values['country']}
							readOnly
							disabled
						/>

						<Number
							name={'age'}
							placeholder={'Enter your age'}
							validate={composeValidators(maxChars(3), mustBeNumber, mustBePositive)}
						/>

						<TextArea 
							name={'description'}
							placeholder={'Please enter a short description of your JavaScript superpowers ... (minimum 20, maximum 250 characters)'}
							validate={composeValidators(minChars(20), maxChars(250))}							
							maxLength={'250'}
							rows={'5'}
						/>

						<div>Unwanted DOM child that eventually will be a styling part.</div>
					</Form>
				</div>

				<FormErrors errors={this.state.errors} />
				{errors['email']}

			</div>
		)
	}
}

export default FormTester

