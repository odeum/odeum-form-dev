import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fieldtypes } from './fieldtypes'
import { DisplayState } from '../FormComponent/DisplayStateProps'
import clearConsole from '../FormComponent/consoleAPI'
// import { required } from '../FormComponent/Validators'

// import { required } from '../FormComponent/Validators'

class AutoForm extends Component {
	constructor(props) {
		super(props)

		this.inputs = {}

		const { model } = this.props

		this.state = {
			values: model,
			validation: model,
			errors: model,
			inputFocus: 0,
			isFormValid: false,
			isSubmitting: false
		}
		// clearConsole()	
	}
	
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

			if (NextInput.readOnly) {
				this.setState({ inputFocus: (this.state.inputFocus + 1) % Object.keys(this.inputs).length }, () => this.nextInput())
			}
			else {
				this.focusInput(NextInput.name)
				this.setState({ inputFocus: (this.state.inputFocus + 1) % Object.keys(this.inputs).length })
			}
		}
		else {
			if (this.inputs[field].readOnly) {
				this.setState({ inputFocus: (Object.keys(this.inputs).findIndex((input) => input === field) + 1) % Object.keys(this.inputs).length }, () => this.nextInput())
			}
			else {
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

	createInputRef = (name) => (input) => {
		if (input !== null)
			return this.inputs[input.name] = input
	}
	
	createFieldComponent = (field) => {
		const { options } = this.props
		const { values, validation } = this.state
		const FieldComponent = fieldtypes[field].component
		switch (field) {
			case 'country':
				// if (Array.isArray(options[field]) & !null) console.log(options[field])
				const countryOptions = (Array.isArray(options[field]) & !null) ? options[field].map((key, i) => 
					<option key={i} value={key.value}>{key.label}</option>
				) : <option value={null}>No countries available ...</option>
				return (
					<FieldComponent
						name={field}
						placeholder={`Enter ${field}`}
						createInputRef={this.createInputRef}
						onChange={this.handleChange}
						color={!validation[field] ? '#BE4F44' : undefined}
						focusColor={(!validation[field] ? '#BE4F44' : undefined)}
						value={values[field]}
						{...this.props}>
						{countryOptions}
					</FieldComponent>
				)
			default:
				return (
					<FieldComponent
						name={field}
						placeholder={`Enter ${field}`}
						createInputRef={this.createInputRef}
						onChange={this.handleChange}
						color={!validation[field] ? '#BE4F44' : undefined}
						focusColor={(!validation[field] ? '#BE4F44' : undefined)}
						value={values[field]}
						{...this.props}
					/>
				)				
		}
	}	
	
	handleReset = () => {
		const { model, focusfield } = this.props
		console.log('Reset ... ')

		this.setState({
			values: model,
			validation: '',
			errors: '',
			inputFocus: 0,
			isFormValid: false,
			isSubmitting: false
		})

		if (focusfield) this.nextInput(focusfield)
		else this.nextInput(Object.keys(this.inputs)[0])
		// this.props.onReset()
	}

	handleChange = (e) => {
		const field = e.target.name
		const value = e.target.value
		const { /* model,  */validators } = this.props
		const validator = validators[field] ? validators[field] : /* model[field] === 'country' ? required :  */null
		
		this.setState({ values: { ...this.state.values, [field]: value } }, this.validateForm)
		
		if (validator) {
			if (validator(value)) {
				// NOT VALID
				this.setState({
					errors: {
						...this.state.errors,
						[field]: validator(value)
					},
					validation: {
						...this.state.validation,
						[field]: false
					}
				}, this.validateForm)
			}
			else {
				this.setState({
					// VALID
					errors: {
						...this.state.errors,
						[field]: ''
					},
					validation: {
						...this.state.validation,
						[field]: true
					}
				}, this.validateForm)
			}
		}
	}

	validateForm = () => {
		const { validation } = this.state

		this.setState({ isFormValid: false }, this.exportValues)

		let allValid = Object.keys(validation).every((value) => validation[value] === true)

		if (allValid) {
			this.setState({ isFormValid: true, errors: '' }, this.exportValues)
		}
	}

	render() {
		const { model, debug } = this.props		
		const formFields = Object.keys(model).map((field) => 
			<div key={field}>{this.createFieldComponent(field)}</div>)

		return (		
			<form>			
				{formFields}
				{debug ? <DisplayState {...this.state} /> : null}
			</form>						
		)
	}
}

AutoForm.propTypes = {
	model: PropTypes.object.isRequired,
	options: PropTypes.object.isRequired
}

export default AutoForm
