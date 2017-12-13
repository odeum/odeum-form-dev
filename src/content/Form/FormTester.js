import React, { Component } from 'react'
// import { ButtonPanel, Button } from 'odeum-ui'
import Form from './FormComponent/Form' // odeum-form
// import Field from './FormComponent/Field'
import { Email, Password, Phone } from './FormComponent/Fields' // odeum-form
// import RenderButtons from './FormComponent/RenderButtons'
import FormErrors from './FormErrors'

import { 
	composeValidators, 
	isEmail, 
	minChars, 
	isPhoneNumber, 
	hasLower, 
	hasUpper, 
	hasSymbol, 
	hasNumber, 
	mustBeLetters, 
	/* maxChars, */ 
	/* formattedDate, */ 
	/* mustBeNumber, */ } from './FormComponent/Validators' // odeum-form-validators


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
				phone: '',
				phone2: '',
				phone3: '',
			}
		}

		this.state = {
			errors: ''
		}
	}

	handleError = (errors) => {
		this.setState({ errors: errors })
	}

	handleSubmit = (data) => {
		console.log('Submitting data ...', data)
	}

	render() {
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
						styles={''}
						debug={true}
					>
						<Email
							name={'email'}
							placeholder={'Enter your mail address ... '}
							validate={isEmail}
						/>
						<Password
							name={'password'}
							placeholder={'Enter your password ... '}
							validate={composeValidators(minChars(8), hasLower, hasUpper, hasSymbol, hasNumber)}
						/>
						<Phone
							name={'phone'}
							placeholder={'Enter your phone number ... '}
							validate={composeValidators(mustBeLetters, minChars(8))}
							// validate={isPhoneNumber} 
							// validate={formattedDate}
							// validate={maxChars(10)}
							// validate={mustBeNumber}
						/>
						<Phone
							name={'phone2'}
							placeholder={'Enter your phone number 2 ... '}
							readOnly
						/>
						{/* <Field
							type={'tel'}
							name={'phone3'}
							placeholder={'Enter your phone number 3 ... '}
							validate={isPhoneNumber} 
						/> */}
						<div name={'div'}>Unwanted DOM child that eventually will be a styling part.</div>
					</Form>
				</div>
				<FormErrors errors={this.state.errors} />
			</div>
		)
	}
}

export default FormTester
