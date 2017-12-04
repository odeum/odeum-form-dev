import React, { Component } from 'react'
import { StyledInput } from './FormStyles'
import { ButtonPanel, Button } from 'odeum-ui'

// Called by Common Field Component
export class Field extends Component {
	render() {
		return (
			<div>
				<StyledInput {...this.props} />
			</div>
		)
	}
}

/* 
Common Field Component wrapping all the generic props and methods from the Generic Field Component.

*/
export class Email extends Component {

	constructor(props) {
		super(props)

		this.state = {
			value: ''
		}
	}	

	handleChange = (e) => {
		// console.log('Hi Hi ... ')
		const name = e.target.name
		const value = e.target.value
		this.setState({ value: value })
		// console.log(name + ': ', value)
		this.props.test(name, this.state.value)
	}

	render() {
		const fieldId = 'email'
		return (
			<div>
				<Field
					type={fieldId}
					name={fieldId}
					value={this.state.value}
					// innerRef={this.props.createInputRef(fieldId)}
					onChange={this.props.handleChange}
					// onChange={this.handleChange}
					

					// color={!this.state.emailValid ? '#BE4F44' : undefined}
					// focusColor={!this.state.emailValid ? '#BE4F44' : undefined}
					// onFocus={this.props.handleFocus}

					{...this.props} 
					// onBlur={this.handleChange}
					// onMouseEnter={this.handleMouse('Enter')}
					// onMouseLeave={this.handleMouse('Leave')}
					// required, placeholder, disabled, defaultValue, readOnly
				/>
			</div>
		)
	}
}

export class Form extends Component {

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
			inFocus: '',
			refCount: null
		}
	}

	componentDidMount() {
		// const { focus } = this.props
		// if (focus) {
		// 	this.focusInputRef(focus) // 'email'
		// }
		// document.addEventListener('keydown', this.onKeydown)
	}

	componentWillUnmount() {
		// document.removeEventListener('keydown', this.onKeydown)
		// this.inputRefs = {} // Reset input refs
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

	handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		this.setState({ [name]: value },
			() => { this.validateField(name, value) })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	createInputRef = (name) => (input) => {
		return this.inputRefs[name] = input
	}

	focusInputRef = (name) => {
		this.inputRefs[name].focus()
	}

	handleFocus = () => {
		let refCount = Object.keys(this.inputRefs).length
		let inFocus = document.activeElement.name
		this.setState({ inFocus: inFocus, refCount: refCount })
	}

	// FORM RENDER
	render() {
		// console.log(this.props.children)
		return (
			<div>
				{this.props.onSubmit ? 
					<form onSubmit={this.props.handleSubmit} {...this.props}>
						{this.props.children}
						<ButtonPanel justify={'left'} >

							<Button
								label={'Save'}
								icon={'check'}
								type={'submit'}
								onClick={this.handleSubmit}
								// disabled={!this.state.formValid}
								// isDisabled={!this.state.formValid}
								color={'#13A085'}
								// color={this.state.formValid ? '#13A085' : ''}
								onSubmit={this.props.handleSubmit}
							/>

							<Button
								label={'Reset'}
								icon={'close'}
								// type={'reset'}
								onClick={this.handleResetInput}
								color={'#BE4F44'}
							/>

						</ButtonPanel>

					</form> 
					: 
					<form onSubmit={this.props.handleSubmit} {...this.props}>
						{this.props.children}
					</form>		
				}
			</div>
		)
	}
}


// App or other higher level component composing the form and issues the form state and utility methods for submit ...
class FormTester extends Component {

	constructor(props) {
		super(props)
		
		this.state = {
			values: {
				email: ''
			}
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

	handleChange2 = (fieldName, value) => {
		console.log(value)
		this.setState({ values: { ...this.state.values, [fieldName]: value } })
	}

	render() {
		// const { email, } = this.state.formErrors
		return (
			<div>
				<h1>Form component test</h1>
				<p>Please fill out the following form fields:</p>

				<Form 
					focus={'email'} 
					onSubmit={this.handleSubmit} // Use internal Buttons for submit
				> 
					<Email 
						// validate={this.validateField('email')} 
						placeholder={'Mail address'} 
						value={this.state.values['email']}
						onChange={this.handleChange}
						test={this.handleChange2}
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