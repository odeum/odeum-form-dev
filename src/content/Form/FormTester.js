import React, { Component } from 'react'
// import { ButtonPanel, Button } from 'odeum-ui'
import Form from './FormComponent/Form'
import { Email, Password } from './FormComponent/Fields'


// App or other higher level component composing the form and issues the form state and utility methods for submit ...
class FormTester extends Component {

	constructor(props) {
		super(props)

		this.state = {
			values: {
				email: '',
				name: '',
				password: '',
				phone: '',
				address: ''
			},
		}

	}

	handleSubmit = () => {
		console.log('Submitting data ...', this.state.values.email)
	}

	handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		this.setState({ values: { ...this.state.values, [name]: value } })
	}

	render() {
		// const { email, } = this.state.formErrors
		return (
			<div>
				<h1>Form component test</h1>
				<p>Please fill out the following form fields:</p>

				<Form
					focusField={'email'}
					data={this.state}
					onSubmit={this.handleSubmit} // Use internal Buttons for submit
				>
					<Email
						// validate={this.validateField('email')} 
						name={'email'}
						placeholder={'Mail address'}
						// value={this.state.values['email']}
						// onChange={this.handleChange}
						isValid={true}
					/>
					<Email
						// validate={this.validateField('email')} 
						name={'email3'}
						placeholder={'Mail address'}
						// value={this.state.values['email']}
						// onChange={this.handleChange}
						isValid={true}
					/>

					<Password
						name={'password'}
						// validate={this.validateField('password')} 
						placeholder={'Password'}
						// value={this.state.values['password']}
						// onChange={this.handleChange}
						isValid={true}
					/>

				</Form>

				{/* <ButtonPanel justify={'left'} >

					<Button
						label={'Save'}
						icon={'check'}
						type={'submit'}
						onClick={this.handleSubmit}
						// disabled={!this.state.formValid}
						// isDisabled={!this.state.formValid}
						color={'#13A085'}
						// color={this.state.formValid ? '#13A085' : ''}
					// onSubmit={this.handleSubmit}
					/>

					<Button
						label={'Reset'}
						icon={'close'}
						// type={'reset'}
						onClick={this.handleResetInput}
						color={'#BE4F44'}
					/>

				</ButtonPanel> */}

			</div>
		)
	}
}

export default FormTester

this.oldstate = {
	email: '',
	password: '',
	formErrors: { email: '', password: '' },
	emailValid: false,
	passwordValid: false,
	formValid: false,
	inFocus: '',
	refCount: null
}

this.state1 = {
	values: {
		email: '',
		name: '',
		password: '',
		phone: '',
		address: ''
	},

	errors: {
		email: '',
		name: '',
		password: '',
		phone: '',
		address: ''
	},

	validation: {
		email: false,
		name: false,
		password: false,
		phone: false,
		address: false
	},

	formValid: false,
	inFocus: '',
	refCount: null
}

this.state2 = {
	email: {
		value: '',
		error: '',
		valid: false,
	}
}

