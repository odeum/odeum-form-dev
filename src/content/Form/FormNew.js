import React, { Component } from 'react'
import { ButtonPanel, Button } from 'odeum-ui'

import { Email, Password } from './FormStyles'
import FormErrors from './FormErrors'

class FormNew extends Component {
	
	
	constructor(props) {
		super(props)
		
		this.inputRefs = {}
		
		this.state = {
			email: '',
			password: '',
			formErrors: { email: '', password: '' },
			emailValid: false,
			passwordValid: false,
			formValid: false,
			inFocus: ''
		}
	}

	componentDidMount() {
		this.focusInputRef('email')
		document.addEventListener('keydown', this.onKeydown)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeydown)
	}

	onKeydown = ({ keyCode }) => {
		switch (keyCode) {
			case 27: // ESCAPE
				this.handleResetInput()
				break
			case 13: // ENTER
				if (this.state.formValid) {
					this.props.onSubmit(this.state)
				}
				else if (document.activeElement.name === 'email') {
					this.focusInputRef('password')
				}
				else if (document.activeElement.name === 'password') {
					this.focusInputRef('email')
				}				
				// this.setState({ id: this.state.id < this.inputs.length - 1 ? (this.state.id + 1) : 0 })
				break
			default:
				break
		}
	}

	handleResetInput = (fields) => {
		// if arg(fields) { this.setState({ fields, ... }) }
		this.setState({
			email: '',
			password: '',
			formErrors: { email: '', password: '' },
			emailValid: false,
			passwordValid: false,
			formValid: false
		})
		this.focusInputRef('email')
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}
	
	handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		this.setState({ [name]: value },
			() => { this.validateField(name, value) })
	}

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors
		let emailValid = this.state.emailValid
		let passwordValid = this.state.passwordValid

		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
				fieldValidationErrors.email = emailValid ? '' : ' is invalid'
				break
			case 'password':
				passwordValid = value.length >= 8
				fieldValidationErrors.password = passwordValid ? '' : ' is too short'
				break
			default:
				break
		}

		this.setState({
			formErrors: fieldValidationErrors,
			emailValid: emailValid,
			passwordValid: passwordValid
		}, this.validateForm)
	}

	validateForm() {
		this.setState({ formValid: this.state.emailValid && this.state.passwordValid })
	}

	errorClass(error) {
		return (error.length === 0 ? '' : 'has-error')
		// return (error.length === 0 ? false : true)
	}

	inputError(error) {
		return (error.length === 0 ? false : true)
	}

	// THE NEW KIDS ON THE BLOCK ... 
	createInnerRef = (name) => (input) => {				
		return this.inputRefs[name] = input
	}	

	focusInputRef = (name) => {
		this.inputRefs[name].focus()
	}


	handleFocus = () => {
		/* 
		
		Pseudo: 
		- [V] Need to update state with which field is currently in focus
		- [V] Need to know how many referenced fields we have
		- Need to know if focused field is first
		- Need to know if focused field is last

		let inFocus = document.activeElement
		Iterate over object entries to find inFocus===entry
		setState({ inFocus: })
		if (this.state.inFocus === 'email') { ... }

		*/

		let refCount = Object.keys(this.inputRefs).length
		let inFocus = document.activeElement.name

		console.log(inFocus)
		this.setState({ inFocus: inFocus })

		console.log('InnerRef: ', this.inputRefs[inFocus].name)		
		console.log(refCount)
	}

	handleBlur = () => {
	}

	handleMouse = (passage) => (e) => {
		e.preventDefault()
	}

	render() {
		const { email, password } = this.state.formErrors
		return (
			<div>
				<h1>Form Demo</h1>
				<p>Please enter your e-mail and password:</p>

				<form>
					<div>
						<Email
							type={'email'}
							// required 
							placeholder={'Mail address'}
							name={'email'}
							value={this.state.email}
							disabled={false}
							onChange={this.handleChange}
							innerRef={this.createInnerRef('email')}
							color={!this.state.emailValid ? '#BE4F44' : undefined}
							focusColor={!this.state.emailValid ? '#BE4F44' : undefined}
							onFocus={this.handleFocus}
							onBlur={this.handleChange}
							onMouseEnter={this.handleMouse('Enter')}
							onMouseLeave={this.handleMouse('Leave')}
						/>
					</div>
					<div>
						<Password
							type={'password'}
							placeholder={'Password'}
							name={'password'}
							value={this.state.password}
							disabled={false}
							innerRef={this.createInnerRef('password')}
							onChange={this.handleChange}
							color={!this.state.passwordValid ? '#BE4F44' : undefined}
							focusColor={!this.state.passwordValid ? '#BE4F44' : undefined}
							onFocus={this.handleFocus}
							onBlur={this.handleChange}
						/>
					</div>

					<div>
					</div>
				</form>
				<ButtonPanel justify={'left'} >

					<Button
						label={'Save'}
						icon={'check'}
						type={'submit'}
						onClick={this.handleSubmit}
						disabled={!this.state.formValid}
						isDisabled={!this.state.formValid}
						color={this.state.formValid ? '#13A085' : ''}
						onSubmit={this.handleOnSubmit}
					/>

					<Button
						label={'Reset'}
						icon={'close'}
						type={'reset'}
						onClick={this.handleResetInput}
						color={'#BE4F44'}
					/>

				</ButtonPanel>
				<div>
					<FormErrors formErrors={this.state.formErrors} />
					{`${this.errorClass(email)}`}{' '}
					{`${this.errorClass(password)}`}
				</div>
			</div>
		)
	}
}

export default FormNew
