import React, { Component } from 'react'
import { ButtonPanel, Button } from 'odeum-ui'
import { DisplayState } from './DisplayStateProps'

class Form extends Component {

	constructor(props) {
		super(props)

		this.inputs = {}
		this.inputsArray = []

		this.state = {
			values: '',
			validation: '',
			errors: '',

			// formErrors: { email: '', password: '' },
			// emailValid: false,
			// passwordValid: false,

			isFormValid: false,
			inFocus: '',
			refCount: ''
		}
	}

	componentDidMount() {
		const { model } = this.props
		const { focusfield } = this.props
		
		this.setState({ values: model, validation: model, errors: model })
		
		if (focusfield) {
			this.focusInput(focusfield)
		}

		this.inputsArray = Array.prototype.slice.call(document.querySelectorAll("input"))

		document.addEventListener('keydown', this.onKeydown)
	}
	
	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeydown)
		this.inputs = {} // Reset input refs
		this.inputsArray = [] // Reset input refs array
	}


	nextField = () => {
		const index = (this.inputsArray.indexOf(document.activeElement) + 1) % this.inputsArray.length 
		const input = this.inputsArray[index]
		input.focus()
		input.select()
	}

	onKeydown = ({ keyCode }) => {
		switch (keyCode) {
			case 27: // ESCAPE
				this.handleResetInput()
				break
			case 13: // ENTER				
				if (this.state.isFormValid) {
					console.log('ENTER on valid')
					this.props.onSubmit(this.state)
				}
				else this.nextField()
				break
			default:
				break
		}
	}

	handleResetInput = () => {
		const { model, focusfield } = this.props
		// if arg(fields) { this.setState({ fields, ... }) }
		// this.setState({
		// 	values: this.props.model,
		// 	formErrors: { email: '', password: '' },
		// 	emailValid: false,
		// 	passwordValid: false,
		// 	isFormValid: false,
		// })
		this.setState({ values: model, validation: model, errors: model })		
		this.focusInput(focusfield)
	}

	handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		this.setState({ values: { ...this.state.values, [name]: value } })
		// this.setState({ [name]: value },
		// 	/* () => { this.validateField(name, value) } */)
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state.values)
	}

	createInputRef = (name) => (input) => {
		return this.inputs[name] = input
	}

	focusInput = (name) => {
		this.inputs[name].focus()
	}

	handleFocus = () => {
		let refCount = Object.keys(this.inputs).length
		let currentFocus = document.activeElement.name
		document.activeElement.select()
		this.setState({ inFocus: currentFocus, refCount: refCount })
	}

	RenderFormField = () => {
		const { children } = this.props
		const { values, validation } = this.state
		return (
			React.Children.toArray(children).map((child, index) => {
				// let currentChild = child.type.name.toLowerCase()
				let name = child.props.name				
				if (child.type.name !== undefined) { 
					return React.cloneElement(child, {
						key: index,
						createInputRef: this.createInputRef,
						handleChange: this.handleChange,
						handleFocus: this.handleFocus,
						color: (!validation[name] ? '#BE4F44' : undefined),
						focusColor: (!validation[name] ? '#BE4F44' : undefined),
						value: (values[name] !== undefined ? values[name] : ''),
					})				
				} 
				else return null
			})
		)
	}

	RenderButtons = () => {
		const { isFormValid } = this.state
		return (
			<ButtonPanel justify={'left'} >
				<Button
					label={'Save'}
					icon={'check'}
					onClick={this.handleSubmit}
					disabled={!isFormValid}
					isDisabled={!isFormValid}
					color={isFormValid ? '#13A085' : ''}
				/>
				<Button
					label={'Reset'}
					icon={'close'}
					type={'reset'}
					onClick={this.handleResetInput}
					color={'#BE4F44'}
				/>
			</ButtonPanel>
		)
	}

	// FORM RENDER
	render() {		
		return (
			<div>			
				<form {...this.props}>
					{this.RenderFormField()}
					{this.RenderButtons()}
					{this.props.debug === 'on' ? <DisplayState {...this.state} /> : null}
				</form>
			</div>
		)
	}
}

export default Form

// this.inputObject = { email: input.sc - frDJqD.cFXjom, password: input.sc - frDJqD.cFXjom, phone: input.sc - frDJqD.cFXjom }