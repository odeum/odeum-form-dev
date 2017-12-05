import React, { Component } from 'react'
// import { ButtonPanel, Button } from 'odeum-ui'
import Form from './FormComponent/Form'
import { Email, Password, Phone } from './FormComponent/Fields'


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
					debug={'on'}
				>
					<Email
						name={'email'}
						placeholder={'Enter your mail address ... '}
						// validate={this.validateField('email')} 
					/>
					<Password
						name={'password'}
						placeholder={'Enter your password ... '}
						// validate={this.validateField('password')} 
					/>
					<Phone
						name={'phone'}
						placeholder={'Enter your phone number ... '}
						// validate={this.validateField('password')} 
					/>
					<Phone
						name={'phone2'}
						placeholder={'Enter your phone number ... '}
						// validate={this.validateField('password')} 
					/>

				</Form>
			</div>
		)
	}
}

export default FormTester
