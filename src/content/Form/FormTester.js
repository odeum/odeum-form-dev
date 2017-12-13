import React, { Component } from 'react'
// import { ButtonPanel, Button } from 'odeum-ui'
import Form from './FormComponent/Form' // odeum-form
import { Email, Password, Phone } from './FormComponent/Fields' // odeum-form
// import RenderButtons from './FormComponent/RenderButtons'
import { composeValidators, isEmail, mustBeNumber, minChars, isPhoneNumber, hasLower, hasUpper, hasSymbol, hasNumber, /* maxChars, */ formattedDate } from './FormComponent/Validators' // odeum-form


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
			}
		}
	}

	handleSubmit = (data) => {
		console.log('Submitting data ...', data)
	}

	render() {
		return (
			<div>
				<h1>Form component test</h1>
				<p>Please fill out the following form fields:</p>

				<Form
					focusfield={'email'}
					onSubmit={this.handleSubmit}
					model={this.model.values}
					styles={''}
					debug
				>
					<Email
						name={'email'}
						placeholder={'Enter your mail address ... '}
						// validate={this.validateField('email')} 	
						validate={composeValidators(minChars(8), isEmail)}
					/>
					<Password
						name={'password'}
						placeholder={'Enter your password ... '}
						validate={composeValidators(minChars(8), hasLower, hasUpper, hasSymbol, hasNumber)}
					/>
					<Phone
						name={'phone'}
						placeholder={'Enter your phone number ... '}
						// validate={formattedDate}
						// validate={maxChars(10)}
						validate={isPhoneNumber} 
						// validate={mustBeNumber}
					/>
					<Phone
						name={'phone2'}
						placeholder={'Enter your phone number 2 ... '}
						readOnly
					/>
					<div name={'div'}>Hello World, I am an unwanted DOM child that eventually will be a styling part.</div>

				</Form>
			</div>
		)
	}
}

export default FormTester
