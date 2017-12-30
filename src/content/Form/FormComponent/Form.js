import React, { Component } from 'react'
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
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.reset) {
			this.handleReset()
		} 
	}

	//#endregion

	//#region onKeyPress Handling

	onKeydown = ({ keyCode }) => {
		switch (keyCode) {
			case 27: // ESC
				if (this.props.allowKeys['esc']) {					
					this.props.onReset()
				}
				break
			case 13: // ENTER
				if (this.props.allowKeys['enter']) {
					if (this.state.isFormValid) {
						this.props.onSubmit()
						this.props.onReset()						
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

	handleReset = () => {
		const { model, focusfield } = this.props
		this.setState({
			values: model,
			validation: '',
			errors: '',
			inputFocus: 0,
			isFormValid: false
		})

		if (focusfield) this.nextInput(focusfield)
		else this.nextInput(Object.keys(this.inputs)[0])
		this.props.onReset()
	}

	//#endregion

	//#region Value Change
	
	handleChange = (child) => (e) => {
		// console.log(child.type)
		
		switch (child.type.name) {
			case 'Select': console.log('Select')
				break
			case 'Checkbox': console.log('Checkbox')
				break
			case 'Switch': console.log('Switch')
				break
			default: console.log('Input')
				break
		}

		const name = e.target.name
		const value = e.target.value
		const validator = child.props.validate ? 
			child.props.validate : child.type.name === 'Select' ? 
				required : null

		this.setState({ values: { ...this.state.values, [name]: value } }, this.validateForm)
		
		if (validator) {
			if (validator(value)) {
				// NOT VALID
				this.setState({
					errors: {
						...this.state.errors,
						[name]: validator(value)
					},
					validation: {
						...this.state.validation,
						[name]: false
					}
				}, this.validateForm)
			}
			else {
				this.setState({
					// VALID
					errors: {
						...this.state.errors,
						[name]: ''
					},
					validation: {
						...this.state.validation,
						[name]: true
					}
				}, this.validateForm)
			}
		}		
	}

	//#endregion
  
	//#region Form Validation

	validateForm = () => {
		const { validation } = this.state

		this.setState({ isFormValid: false }, this.exportValues)

		let allValid = Object.keys(validation).every((value) => validation[value] === true)

		if (allValid) {
			this.setState({ isFormValid: true, errors: '' }, this.exportValues)
		}
	}

	//#endregion

	//#region Form Handling from outside

	exportValues = () => {
		this.handleValues()
		this.handleError()
	}

	handleValues = () => {
		if (this.props.onChange) {
			this.props.onChange(this.state)
		}
	}
	
	handleError = () => {
		if (this.props.onError) {
			this.props.onError(this.state.errors)
		}
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

	// FORM RENDER
	render() {
		const { debug } = this.props
		return (
			<div>
				<form>					
					{this.RenderForm()}
				</form>
				{debug ? <DisplayState {...this.state} /> : null}
			</div>
		)
	}

	//#endregion
}

export default Form