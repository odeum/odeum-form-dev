import React, { Component } from 'react'
import { ButtonPanel, Button } from 'odeum-ui'

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

	// FORM RENDER
	render() {
		let fieldsArray = this.props.children
		if (fieldsArray.length > 1) {			
			if (fieldsArray[0].type.name === 'Email') {  
				console.log('Email field detected ... ')
			}
		}
		else if (fieldsArray.type.name === 'Email') {
			console.log('Email field detected ... ')
		}
		
		return (
			<div>
				{this.props.onSubmit ?
					<form onSubmit={this.handleSubmit}
						{...this.props}>
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
								onSubmit={this.handleSubmit}
							/>
							<Button
								label={'Reset'}
								icon={'close'}
								// type={'reset'}
								// onClick={this.handleResetInput}
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