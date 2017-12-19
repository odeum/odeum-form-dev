import React, { Component } from 'react'
import { ButtonPanel, Button } from 'odeum-ui'
import { DisplayState } from './DisplayStateProps'
import clearConsole from './consoleAPI'

class Form extends Component {

	constructor(props) {
		super(props)


		this.inputs = {}
		this.inputsArray = []

		this.inputsArray = Array.prototype.slice.call(document.querySelectorAll('input'))
		let inputCount = this.inputsArray.length

		const { model } = props
		this.state = {
			values: model,
			validation: model,
			errors: model,
			inputCount: inputCount,
			fieldProps: this.mapFieldPropsToState(),
			inputFocus: 0,
			isFormValid: false,
			inFocus: ''
		}
	}

	componentDidMount() {

		const { focusfield } = this.props

		// this.inputsArray = Array.prototype.slice.call(document.querySelectorAll('input'))
		// let inputCount = this.inputsArray.length

		// let fieldProps = this.mapFieldPropsToState()

		// this.setState({
		// 	values: model,
		// 	validation: model,
		// 	errors: model,
		// 	inputCount: inputCount,
		// 	fieldProps: fieldProps,
		// })
		if (focusfield)
			this.nextInput(focusfield)
		else
			this.nextInput()
		// if (focusfield) {

		// 	var index = Object.keys(this.inputs).findIndex((input) => input === focusfield)
		// 	console.log(index)
		// 	if (index !== -1) {
		// 		this.focusInput(focusfield)
		// 		//this.setState({ inputFocus: index })
		// 	}
		// 	else {
		// 		console.error('focusfield ' + focusfield + ' has a wrong value')
		// 		//this.nextInput()
		// 	}
		// }
		// else { this.nextInput() }

		document.addEventListener('keydown', this.onKeydown)
		// console.log(this.inputs)
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


	onKeydown = ({ keyCode }) => {
		switch (keyCode) {
			case 27: // ESCAPE
				this.handleResetInput()
				break
			case 13: // ENTER				
				if (this.state.isFormValid) {
					this.props.onSubmit(this.state.values)
					this.handleResetInput()
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

	//#region Input Handling

	nextInput = (field) => {
		//TODO: 
		// this.inputs[Object.keys(this.inputs)[this.state.inputFocus]].focus()
		/* 
			this.inputs -> all the inputs
			Object.keys() -> transform Object keys into an array from 
							{ 
								key1:{
									etc...
								},
								key2:{
									etc....
								}
							}
							to ['key1','key2',......]
			Object.keys(this.inputs)[this.state.inputFocus] -> 
				example:
					Object.keys(this.inputs) = ['email','password','phone','phone2'] (let's call it array)
						so this means that if this.state.inputFocus = 0
							=> array[0] = 'email'
			=> this.inputs['email'].focus()

		*/
		if (!field) {
			if (!this.inputs[Object.keys(this.inputs)[this.state.inputFocus]].readOnly) {
				this.focusInput(Object.keys(this.inputs)[this.state.inputFocus])
				this.setState({ inputFocus: (this.state.inputFocus + 1) % Object.keys(this.inputs).length })
			}
			else {
				this.setState({ inputFocus: (this.state.inputFocus + 1) % Object.keys(this.inputs).length })
				this.nextInput()
			}
		}
		else {
			if (!this.inputs[field].readOnly) {
				this.focusInput(field)
				this.setState({ inputFocus: (Object.keys(this.inputs).findIndex((input) => input === field) + 1) % Object.keys(this.inputs).length })
			}
			else {
				this.setState({ inputFocus: (Object.keys(this.inputs).findIndex((input) => input === field) + 1) % Object.keys(this.inputs).length })
				this.nextInput()
			}
		}
		// console.log(this.state.inputFocus)


		// const index = (this.inputsArray.indexOf(document.activeElement) + 1) % this.inputsArray.length

		// const input = this.inputsArray[index]
		// if (!input.readOnly) {
		// 	input.focus()
		// 	input.select()
		// }
	}

	handleResetInput = () => {
		const { model, focusfield } = this.props
		// if arg(fields) { this.setState({ fields, ... }) }
		this.setState({ values: model, validation: model, errors: model, isFormValid: false })
		if (focusfield)
			this.nextInput(focusfield)
		else
			this.nextInput(Object.keys(this.inputs)[0])
	}

	handleError = () => {
		this.props.onError(this.state.errors)
	}

	handleChange = (child) => (e) => {
		const name = e.target.name
		const value = e.target.value
		const validator = child.props.validate
		this.setState({ values: { ...this.state.values, [name]: value } }, () => this.validateForm(child))

		if (validator) {
			if (validator(value)) {
				this.setState({
					errors: {
						...this.state.errors,
						[name]: validator(value)
					},
					validation: {
						...this.state.validation,
						[name]: false
					}
				}, () => this.validateForm(child))
			}
			else {
				this.setState({
					errors: {
						...this.state.errors,
						[name]: ''
					},
					validation: {
						...this.state.validation,
						[name]: true
					}
				}, () => this.validateForm(child))
			}
		}
	}

	createInputRef = name => (input) => {
		// console.log(input.name, name)
		// input.focus()
		if (input !== null)
			return this.inputs[input.name] = input
	}

	focusInput = (name) => {
		// console.debug(name)
		this.inputs[name].focus()
	}

	handleFocus = () => {
		// let inputCount = this.inputsArray.length
		let currentFocus = document.activeElement.name
		document.activeElement.select()
		this.setState({ inFocus: currentFocus })
	}

	//#endregion

	//#region Form Validation

	validateForm = (child) => {
		const { validation } = this.state

		// let allValid = Object.keys(validation).every((value) => { 
		// 	return validation[value] === true 
		// })

		// if (allValid) {
		// 	this.setState({ isFormValid: true, errors: '' })
		// }

		function allTrue(validation) {
			var allTrue = true
			for (let value in validation) {
				if (!validation[value] === true) {
					allTrue = false
				}
			}
			return allTrue
		}

		if (allTrue(validation)) {
			this.setState({ isFormValid: true, errors: '' })
		}

		this.handleError()
	}

	//#endregion

	//#region Form Handling

	handleSubmit = (e) => {
		// e.preventDefault()
		this.props.onSubmit(this.state.values)
		this.handleResetInput()
	}

	handleToggleValidate = () => {
		this.setState({ isFormValid: !this.state.isFormValid })
		this.focusInput('email')
	}

	//#endregion

	//#region Rendering

	RenderFormField = () => {
		const { children } = this.props
		const { values, validation } = this.state
		return (
			React.Children.toArray(children).map((child, index) => {
				const { name } = child.props
				if (child.type.name !== undefined) {
					return React.cloneElement(child, {
						key: index,
						createInputRef: this.createInputRef,
						handleChange: this.handleChange(child),
						handleFocus: this.handleFocus,
						validate: child.props.validate ? child.props.validate : null,
						color: (!child.props.readOnly ? !validation[name] ? '#BE4F44' : undefined : undefined),
						focusColor: (!child.props.readOnly ? !validation[name] ? '#BE4F44' : undefined : undefined),
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
				{/* <Button
					label={!isFormValid ? 'Validate' : 'Invalidate'}
					icon={!isFormValid ? 'check_circle' : 'cancel'}
					type={'reset'}
					onClick={this.handleToggleValidate}
					color={!isFormValid ? '#13A085' : '#BE4F44'}
				/> */}
			</ButtonPanel>
		)
	}

	// FORM RENDER
	render() {
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

	//#endregion
}

export default Form
