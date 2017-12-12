import React, { Component } from 'react'
import { ButtonPanel, Button } from 'odeum-ui'
import { DisplayState } from './DisplayStateProps'
import clearConsole from './consoleAPI'

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
			inputCount: '',
			fieldProps: {},

		}
	}

	componentDidMount() {

		const { model, focusfield } = this.props

		this.inputsArray = Array.prototype.slice.call(document.querySelectorAll('input'))
		let inputCount = this.inputsArray.length

		let fieldProps = this.mapFieldPropsToState()

		this.setState({
			values: model,
			validation: model,
			errors: model,
			inputCount: inputCount,
			fieldProps: fieldProps,
		})

		if (focusfield) {
			this.focusInput(focusfield)
		}

		document.addEventListener('keydown', this.onKeydown)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeydown)
		this.inputs = {} // Reset input refs
		this.inputsArray = [] // Reset input refs array
	}

	mapFieldPropsToState = () => {
		const { children } = this.props
		let propsObject = {}

		let values = Object.values(React.Children.toArray(children))
		// console.log(keys)
		// console.log(values)

		React.Children.toArray(children).map((child, index) => {
			const { name } = child.props

			if (child.type.name !== undefined) { }

			if (name !== undefined) {
				propsObject[name] = values[index].props
			}

			return propsObject
		})
		return propsObject
	}

	nextInput = () => {
		const index = (this.inputsArray.indexOf(document.activeElement) + 1) % this.inputsArray.length

		const input = this.inputsArray[index]
		if (!input.readOnly) {
			input.focus()
			input.select()
		}
		

		console.log(document.activeElement.name)
		if (!this.state.fieldProps[document.activeElement.name].readOnly) {
			console.log('Not read only')
		} else console.log('Read only')
	}

	onKeydown = ({ keyCode }) => {
		switch (keyCode) {
			case 27: // ESCAPE
				this.handleResetInput()
				break
			case 13: // ENTER				
				if (this.state.isFormValid) {
					console.log('ENTER on valid')
					this.props.onSubmit(this.state.values)
				}
				else this.nextInput()
				break
			case 116: // F5
				this.handleToggleValidate()
				break
			case 117: // F6
				clearConsole()
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

	// handleChange = (e) => {
	// 	const name = e.target.name
	// 	const value = e.target.value
	// 	const validator = e.target.validate
	// 	console.log(e.target)
	// 	this.setState({ values: { ...this.state.values, [name]: value }, /* Insert validate calback here */ })
	// 	if (validator) {
	// 		this.setState({
	// 			errors: {
	// 				...this.state.errors,
	// 				[name]: validator(value)
	// 			}
	// 		})
	// 	}
	// 	/* () => { this.validateField(name, value) } */
	// }
	handleChange = (child) => (e) => {
		e.preventDefault()
		const name = child.props.name
		const value = e.target.value
		const validator = child.props.validate
		// console.log(child.props)
		this.setState({ values: { ...this.state.values, [name]: value }, /* Insert validate calback here */ })
		// console.log(validator)
		if (validator) {
			// console.log(validator(value))
			if (validator(value)) {
				this.setState({
					errors: {
						...this.state.errors,
						[name]: validator(value)
					}
				})
			}
			else {
				this.setState({
					errors: {
						...this.state.errors,
						[name]: ''
					}
				})
			}
		}
		/* () => { this.validateField(name, value) } */
	}



	validateForm = () => {
		this.setState({ isFormValid: this.state.emailValid && this.state.passwordValid })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state.values)
	}

	handleToggleValidate = () => {
		this.setState({ isFormValid: !this.state.isFormValid })
		this.focusInput('email')
	}

	createInputRef = (name) => (input) => {
		return this.inputs[name] = input
	}

	focusInput = (name) => {
		this.inputs[name].focus()
	}

	handleFocus = () => {
		// let inputCount = this.inputsArray.length
		let currentFocus = document.activeElement.name
		document.activeElement.select()
		this.setState({ inFocus: currentFocus })
	}

	RenderFormField = () => {
		const { children } = this.props
		const { values, /* validation */ } = this.state
		return (
			React.Children.toArray(children).map((child, index) => {
				const { name } = child.props
				if (child.type.name !== undefined) {
					// console.log(child.props)
					return React.cloneElement(child, {
						key: index,
						createInputRef: this.createInputRef,
						handleChange: this.handleChange(child),
						handleFocus: this.handleFocus,
						validate: child.props.validate ? child.props.validate : null /* child.props.validate */,
						// color: (!validation[name] ? '#BE4F44' : undefined),
						// focusColor: (!validation[name] ? '#BE4F44' : undefined),
						color: (!this.state.isFormValid ? '#BE4F44' : undefined), // temp
						focusColor: (!this.state.isFormValid ? '#BE4F44' : undefined), // temp
						value: (values[name] !== undefined ? values[name] : ''),
					})
				}
				else return React.cloneElement(child)
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
				<Button
					label={!isFormValid ? 'Validate' : 'Invalidate'}
					icon={!isFormValid ? 'check_circle' : 'cancel'}
					type={'reset'}
					onClick={this.handleToggleValidate}
					color={!isFormValid ? '#13A085' : '#BE4F44'}
				/>
			</ButtonPanel>
		)
	}

	// FORM RENDER
	render() {
		// if (this.state.fieldProps['phone2'] !== undefined) {
		// 	console.log(this.state.fieldProps['phone2'].readOnly)
		// }


		return (
			<div>
				<form /* {...this.props} */>
					{this.RenderFormField()}
					{this.RenderButtons()}
					{this.props.debug ? <DisplayState {...this.state} /> : null}
				</form>
			</div>
		)
	}
}

export default Form
