import React, { Component } from 'react'
import { ButtonPanel, Button } from 'odeum-ui'
// import { Password, Email } from 'content/Form/FormComponent/FormStyles'
import { Email, Password } from './Fields'

class Form extends Component {

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
		const { focusfield } = this.props
		if (focusfield) {
			this.focusInputRef(focusfield)
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
				console.log('ESC')
				break
			case 13: // ENTER				
				if (this.state.formValid) {
					console.log('ENTER on valid')
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

	handleResetInput = () => {
		// if arg(fields) { this.setState({ fields, ... }) }
		// this.setState({
		// 	email: '',
		// 	password: '',
		// 	formErrors: { email: '', password: '' },
		// 	emailValid: false,
		// 	passwordValid: false,
		// 	formValid: false,
		// 	inFocus: '',
		// 	refCount: null
		// })
		this.setState({})
		this.focusInputRef('email')
	}

	handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		this.setState({ [name]: value },
			/* () => { this.validateField(name, value) } */)
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit()
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

	valueSetter = (child) => {
		switch (child.type) {
			case Email: {
				return this.state.email
			}
			case Password: {
				return this.state.password
			}
			default:
				return null
		}
	}
	// FORM RENDER
	render() {		
		return (
			<div>
				{this.props.onSubmit ?
					<form onSubmit={this.handleSubmit}
						{...this.props}>
						
						{React.Children.toArray(this.props.children).map((child, index) => {
							return React.cloneElement(child, {
								key: index,
								value: this.valueSetter(child),
								createInputRef: this.createInputRef,
								handleChange: this.handleChange
							})
						})}

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
								onSubmit={this.handleSubmit}
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
					<form onSubmit={this.props.handleSubmit}
						{...this.props}>
						{this.props.children}
					</form>
				}
			</div>
		)
	}
}


export default Form