import React, { Component } from 'react'
// import { ButtonPanel, Button } from 'odeum-ui'
import Form from './FormComponent/Form'
import { Email, Password } from './FormComponent/Fields'


// App or other higher level component composing the form and issues the form state and utility methods for submit ...
class FormTester extends Component {

	constructor(props) {
		super(props)

		this.model = {
			values: {
				email: '',
				name: '',
				password: '',
				phone: '',
				address: ''
			}
		}
	}

	handleSubmit = (data) => {
		console.log('Submitting data ...', data)
	}

	render() {
		// const { email, } = this.state.formErrors
		return (
			<div>
				<h1>Form component test</h1>
				<p>Please fill out the following form fields:</p>

				<Form
					focusfield={'email'}					
					onSubmit={this.handleSubmit}
					model={this.model.values}
				>
					<Email
						name={'email'}
						placeholder={'Enter your mail address ... '}
						// isValid={true}
						// validate={this.validateField('email')} 
						// value={this.state.values['email']}
						// onChange={this.handleChange}
					/>


					<Password
						name={'password'}
						placeholder={'Enter your password ... '}
						// isValid={true}
						// validate={this.validateField('password')} 
						// value={this.state.values['password']}
						// onChange={this.handleChange}
					/>

				</Form>
			</div>
		)
	}
}

export default FormTester
