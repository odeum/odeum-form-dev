import React, { Component } from 'react'
import { StyledInput } from './FormStyles'

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

	render() {
		const fieldId = 'email'
		return (
			<div>
				<Field
					type={fieldId}
					name={fieldId}
					value={this.props.value}
					innerRef={this.props.createInputRef(fieldId)}
					onChange={this.props.handleChange}

					color={!this.state.emailValid ? '#BE4F44' : undefined}
					focusColor={!this.state.emailValid ? '#BE4F44' : undefined}
					onFocus={this.handleFocus}
					{...this.props} 
					// onBlur={this.handleChange}
					// onMouseEnter={this.handleMouse('Enter')}
					// onMouseLeave={this.handleMouse('Leave')}
					// required, placeholder, disabled
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
		const { focus } = this.props
		if (focus) {
			this.focusInputRef(focus) // 'email'
		}
		document.addEventListener('keydown', this.onKeydown)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeydown)
		this.inputRefs = {} // Reset input refs
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
		return (
			<div>
				<form onSubmit={this.props.handleSubmit} {...this.props}>
					{this.props.children}
				</form>
			</div>
		)
	}
}


// App or other higher level component using the form
class FormTester extends Component {

	constructor(props) {
		super(props)
		
		this.state = {
			values: {}
		}
	}
	

	handleSubmit = (data) => {
	
	}

	render() {
		// const { email, } = this.state.formErrors
		return (
			<div>
				<Form 
					focus={'email'} 
					onSubmit={this.handleSubmit} 
				> 
					<Email 
						validate={this.validateField('email')} 
						placeholder={'Mail address'} 
						value={this.state.values['email']}
					/>
				</Form>
			</div>
		)
	}
}

export default FormTester