import React, { Component } from 'react'
import { ButtonPanel, Button } from 'odeum-ui'
import { DisplayState } from './DisplayStateProps'
import clearConsole from './consoleAPI'

class Form extends Component {

	constructor(props) {
		super(props)
		const { model } = props

		this.inputs = {}

		this.state = {
			values: model,
			validation: model,
			errors: model,
			inputFocus: 0,
			inFocus: '',
			isFormValid: false,
		}
	}

	componentDidMount() {

		const { focusfield, allowKeys } = this.props

		if (focusfield)
			this.nextInput(focusfield)
		else
			this.nextInput()

		if (allowKeys) {
			document.addEventListener('keydown', this.onKeydown)
		}

	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeydown)
		this.inputs = {} // Reset input refs
	}

	onKeydown = ({ keyCode }) => {
		switch (keyCode) {
			case 27: // ESCAPE
				if (this.props.allowKeys['esc']) {
					this.handleResetInput()
				}
				break
			case 13: // ENTER
				if (this.props.allowKeys['enter']) {
					if (this.state.isFormValid) {
						this.props.onSubmit(this.state.values)
						this.handleResetInput()
					}
					else this.nextInput()
				}			
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
	}

	play = () => {
		if (this.state.values['phone'] === '22680881') {
			console.log('Hello Mikkel ... ')
			this.handleReset('phone')
		}
	}

	handleResetInput = () => {
		const { model, focusfield } = this.props

		this.setState({ values: model, validation: model, errors: model, isFormValid: false })
			
		if (focusfield)
			this.nextInput(focusfield)
		else
			this.nextInput(Object.keys(this.inputs)[0])
	}

	handleResetField = (name) => (e) => {
		console.log(name)
		// e.preventDefault()
		if (name) {
			this.setState({ 
				values: { ...this.state.values, [name]: '' }, 
				validation: { ...this.state.validation, [name]: false },
				isFormValid: false 
			}, () => this.validateForm())
			
			this.nextInput(name)
		}
	}

	handleReset = (name) => {
		console.log(name)
		// e.preventDefault()
		if (name) {
			this.setState({ 
				values: { ...this.state.values, [name]: '' }, 
				validation: { ...this.state.validation, [name]: false },
				isFormValid: false 
			}, () => this.validateForm())
			
			this.nextInput(name)
		}
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

	createInputRef = (name) => (input) => {
		if (input !== null)
			return this.inputs[input.name] = input
	}

	focusInput = (name) => {
		this.inputs[name].focus()
	}

	handleFocus = () => {
		let currentFocus = document.activeElement.name
		document.activeElement.select()
		this.setState({ inFocus: currentFocus })
	}

	//#endregion

	//#region Form Validation

	validateForm = (child) => {
		const { validation } = this.state

		const isAllFieldsValid = (validation) => {
			var allValid = true
			for (let value in validation) {
				if (!validation[value] === true) {
					allValid = false
				}
			}
			return allValid
		}

		if (isAllFieldsValid(validation)) {
			this.setState({ isFormValid: true, errors: '' })
		}

		this.handleError()
		this.play()
		this.handleValues()
	}

	//#endregion

	//#region Form Handling

	handleError = () => {
		if (this.props.onError) {
			this.props.onError(this.state.errors)
		}
	}

	handleValues = () => {
		if (this.props.onChange) {
			this.props.onChange(this.state.values)
		}
	}

	handleSubmit = (e) => {
		this.props.onSubmit(this.state.values)
		this.handleResetInput()
	}

	
	//#endregion

	//#region Rendering

	RenderFormFields = () => {
		const { children } = this.props
		const { values, validation } = this.state
		return (
			React.Children.toArray(children).map((child, index) => {
				const { name } = child.props

				console.log(child.type.name)

				if (child.type.name !== undefined) {
					return React.cloneElement(child, {
						key: index,
						createInputRef: this.createInputRef,
						handleChange: this.handleChange(child),
						handleFocus: this.handleFocus,
						validate: child.props.validate ? child.props.validate : null,
						color: (!child.props.readOnly ? !validation[name] ? '#BE4F44' : undefined : undefined),
						focusColor: (!child.props.readOnly ? !validation[name] ? '#BE4F44' : undefined : undefined),
						value: child.props.value ? child.props.value : (values[name] !== undefined ? values[name] : ''),
						// props: { ...child.props },
					})
				}
				else return React.cloneElement(child)
			})
		)
	}

	RenderForm = () => {
		const { children } = this.props
		const { values, validation } = this.state
		return (
			React.Children.toArray(children).map((child, index) => {
				const { name } = child.props
			
				if (child.type.name !== undefined) {
					if (child.type.name === 'Select') {
						// CASE: SELECT
						return React.cloneElement(child, {
							key: index,
							createInputRef: this.createInputRef,
							handleChange: this.handleChange(child),
							// handleFocus: this.handleFocus,
							// validate: child.props.validate ? child.props.validate : null,
							color: (!child.props.readOnly ? !validation[name] ? '#BE4F44' : undefined : undefined),
							focusColor: (!child.props.readOnly ? !validation[name] ? '#BE4F44' : undefined : undefined),
							value: child.props.value ? child.props.value : (values[name] !== undefined ? values[name] : ''),
							// props: { ...child.props },
						})
					} 
					else {
						// CASE: INPUTS
						return React.cloneElement(child, {
							key: index,
							createInputRef: this.createInputRef,
							handleChange: this.handleChange(child),
							handleFocus: this.handleFocus,
							validate: child.props.validate ? child.props.validate : null,
							color: (!child.props.readOnly ? !validation[name] ? '#BE4F44' : undefined : undefined),
							focusColor: (!child.props.readOnly ? !validation[name] ? '#BE4F44' : undefined : undefined),
							value: child.props.value ? child.props.value : (values[name] !== undefined ? values[name] : ''),
							// props: { ...child.props },
						})
					}

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
					label={'Reset phone'}
					icon={'cancel'}
					type={'reset'}
					onClick={this.handleResetField('phone')}
					color={'#BE4F44'}
				/>
			</ButtonPanel>
		)
	}

	// FORM RENDER
	render() {
		return (
			<div>
				<form>
					{/* {this.RenderFormFields()} */}
					{this.RenderForm()}
					{this.RenderButtons()}
					{this.props.debug ? <DisplayState {...this.state} /> : null}
				</form>
			</div>
		)
	}

	//#endregion
}

export default Form
