import React, { Component } from 'react'
import { ButtonPanel, Button } from 'odeum-ui'
import { DisplayState } from './DisplayStateProps'
import clearConsole from './consoleAPI'
import { required } from '../FormComponent/Validators'

class Form extends Component {
	//#region Constructor & Startup functions

	constructor(props) {
	  super(props)

		this.inputs = {}

		const { model } = this.props

	  	this.state = {
		  	values: model,
		  	validation: model,
		  	errors: model,
		  	inputFocus: 0,
			isFormValid: false		 
	  }
	}

	createInputRef = (name) => (input) => {
		// console.log(name, input)
		if (input !== null)
			return this.inputs[input.name] = input
	}
	//#endregion

	//#region LifeCycle
	componentDidMount = () => {
		const { focusfield, allowKeys } = this.props

		if (focusfield) {
			this.nextInput(focusfield)
		}
		else { 
			this.nextInput()
		}
		if (allowKeys) {
			document.addEventListener('keydown', this.onKeydown)
		}
	}
	
	componentWillUnmount = () => {
	  document.removeEventListener('keydown', this.onKeydown)
	  this.inputs = {}
	}
	
	//#endregion

	//#region onKeyPress Handling

	onKeydown = ({ keyCode }) => {
		switch (keyCode) {
			case 27: // ESCAPE2
				if (this.props.allowKeys['esc']) {
					// console.log('ESC')
					this.handleReset()
				}
				break
			case 13: // ENTER
				if (this.props.allowKeys['enter']) {
					if (this.state.isFormValid) {
						this.props.onSubmit(this.state.values)
						this.handleReset()
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

	nextInput = (field) => {
		if (!field) {
			var NextInput = this.inputs[Object.keys(this.inputs)[this.state.inputFocus]]

			if ( NextInput.readOnly) {
				this.setState({ inputFocus: (this.state.inputFocus + 1) % Object.keys(this.inputs).length }, () => this.nextInput())				
			}
			else {
				this.focusInput(NextInput.name)
				this.setState({ inputFocus: (this.state.inputFocus + 1) % Object.keys(this.inputs).length })
			}
		}
		else
		{
			if (this.inputs[field].readOnly) {
				this.setState({ inputFocus: (Object.keys(this.inputs).findIndex((input) => input === field) + 1) % Object.keys(this.inputs).length }, () =>	this.nextInput())				
			}
			else
			{
				this.focusInput(field)
				this.setState({ inputFocus: (Object.keys(this.inputs).findIndex((input) => input === field) + 1) % Object.keys(this.inputs).length })				
			}
		}
	}

	focusInput = (name) => {
		this.inputs[name].focus()
	}

	handleFocus = (e) => { 
		this.setState({ inputFocus: (Object.keys(this.inputs).findIndex(input => input === e.target.name) + 1) % Object.keys(this.inputs).length })
	}
	//#endregion
	
	//#region ResetForm

	handleResetOnEvent = (name) => (e) => {
		if (name) {
			this.setState({ 
				values: { ...this.state.values, [name]: '' },
				validation: { ...this.state.validation, [name]: '' },
				errors: { ...this.state.errors, [name]: '' },
				inputFocus: 0,
				isFormValid: false
			})
			this.nextInput(name)
		}
		else {
			const { model, focusfield } = this.props
			this.setState({
				values: model,
				validation: model,
				errors: model,
				inputFocus: 0,
				isFormValid: false
			})

			if (focusfield)
				this.nextInput(focusfield)
			else
				this.nextInput(Object.keys(this.inputs)[0])
		}	 
	}

	handleReset = (name) => {
		if (name) {
			this.setState({ 
				values: { ...this.state.values, [name]: '' },
				validation: { ...this.state.validation, [name]: '' },
				errors: { ...this.state.errors, [name]: '' },
				inputFocus: 0,
				isFormValid: false
			})
			this.nextInput(name)
		}
		else {
			const { model, focusfield } = this.props
			this.setState({
				values: model,
				validation: model,
				errors: model,
				inputFocus: 0,
				isFormValid: false
			})

			if (focusfield)
				this.nextInput(focusfield)
			else
				this.nextInput(Object.keys(this.inputs)[0])
		}	 
	}

	//#endregion

	//#region Value Change
	
	handleChange = (child) => (e) => {
		const name = e.target.name
		const value = e.target.value
		const validator = child.type.name === 'Select' ? required : child.props.validate
		// const validator = child.props.validate

		this.setState({ values: { ...this.state.values, [name]: value } }, () => this.validateForm())
		
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
				}, () => this.validateForm())
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
				}, () => this.validateForm())
			}
		}
	}


	//#endregion
  
	//#region Form Validation

	validateForm = () => {
		const { validation } = this.state

		this.setState({ isFormValid: false })

		let allValid = Object.keys(validation).every((value) => validation[value] === true)

		if (allValid) {
			this.setState({ isFormValid: true, errors: '' })
		}

		this.handleError()
		this.handleValues()
	}

	//#endregion

	//#region Outside Form Handling
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
		this.handleReset()
	}
	//#endregion 
	
	//#region Rendering

	RenderForm = () => {
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
						onClick: this.handleFocus,							
						// handleFocus: this.handleFocus,
						validate: child.props.validate ? child.props.validate : null,
						color: (!child.props.readOnly ? !validation[name] ? '#BE4F44' : undefined : undefined),
						focusColor: (!child.props.readOnly ? !validation[name] ? '#BE4F44' : undefined : undefined),
						value: child.props.value ? child.props.value : (values[name] !== undefined ? values[name] : '')
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
					onClick={this.handleResetOnEvent()}
					color={'#BE4F44'}
				/>
				<Button
					label={'Reset phone'}
					icon={'cancel'}
					type={'reset'}
					onClick={this.handleResetOnEvent('phone')}
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