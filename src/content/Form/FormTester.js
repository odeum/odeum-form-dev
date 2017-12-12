import React, { Component } from 'react'
// import { ButtonPanel, Button } from 'odeum-ui'
import Form from './FormComponent/Form2'
import { Email, Password, Phone } from './FormComponent/Fields'
// import RenderButtons from './FormComponent/RenderButtons'
// import { composeValidators, required, minChars, mustBeNumber } from './Validators'
// import { isEmail } from './Validators'

const isEmail = (value) => {
	if (value) return `We have a value: ${value}`
}

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
						// validate={isEmail}											
					/>
					<Password
						name={'password'}
						placeholder={'Enter your password ... '}
						// validate={'Please validate this'} 
					/>
					<Phone
						name={'phone'}
						placeholder={'Enter your phone number ... '}
						// validate={composeValidators(required, mustBeNumber, minChars(8))} 
					/>
					<Phone
						name={'phone2'}
						placeholder={'Enter your phone number 2 ... '}
						// validate={this.validateField('password')} 
						readOnly
					/>
					<div name={'div'}>Hello World I am an unwanted DOM child</div>

				</Form>
			</div>
		)
	}
}

export default FormTester
