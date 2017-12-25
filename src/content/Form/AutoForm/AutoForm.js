import React, { Component } from 'react'
import { fieldtypes } from './fieldtypes'
import { DisplayState } from '../FormComponent/DisplayStateProps'
import clearConsole from '../FormComponent/consoleAPI'
import { required } from '../FormComponent/Validators'

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
		clearConsole()
		this.handleReset()
	}

	createFieldComponent = (field) => {
		const { model } = this.props
		const { values, validation } = this.state
		const FieldComponent = fieldtypes[field].component
		
		switch (field) {
			case 'country':
				const options = model[field].options.map((key, i) => 
					<option key={i} value={key.value}>{key.label}</option>
				)
				return (
					<FieldComponent
						name={field}
						placeholder={`Enter ${field}`}
						// innerRef={this.props.createInputRef ? this.props.createInputRef(field) : null}
						onChange={this.handleChange}
						color={!validation[field] ? '#BE4F44' : undefined}
						focusColor={(!validation[field] ? '#BE4F44' : undefined)}
						value={values[field]}
						{...this.props}>
						{options}
					</FieldComponent>
				)
			default:
				return (
					<FieldComponent
						name={field}
						placeholder={`Enter ${field}`}
						// innerRef={this.props.createInputRef ? this.props.createInputRef(field) : null}
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
		const { model, /* focusfield */ } = this.props

		this.setState({
			values: model,
			validation: '',
			errors: '',
			inputFocus: 0,
			isFormValid: false,
			isSubmitting: false
		})

		// if (focusfield) this.nextInput(focusfield)
		// else this.nextInput(Object.keys(this.inputs)[0])
		// this.props.onReset()
	}

	handleChange = (e) => {
		const field = e.target.name
		const value = e.target.value
		const { model, validators } = this.props
		const validator = validators[field] ? validators[field] : model[field] === 'country' ? required : null
		
		// console.log(validator)
		
		// const validator = child.props.validate ?
		// 	child.props.validate : child.type.name === 'Select' ?
		// 		required : null
		
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
				{/* {Object.keys(model['country'].options[1])}  */}
				{formFields}
				{debug ? <DisplayState {...this.state} /> : null}
			</form>						
		)
	}
}

export default AutoForm


// Object.keys(validation).every((value) => validation[value] === true)
