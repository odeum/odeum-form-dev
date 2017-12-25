import React, { Component } from 'react'
import { fieldtypes } from './fieldtypes'
import { DisplayState } from '../FormComponent/DisplayStateProps'
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
	}

	createFieldComponent = (field) => {
		console.log(field[field])

		const { model } = this.props
		const { values, validation } = this.state
		const FieldComponent = fieldtypes[field].component
		
		switch (field) {
			case 'country':
				console.log(model[field].validate)
				const options = model[field].options.map((key, i) => 
					<option key={i} value={key.value}>{key.label}</option>
				)
				return (
					<FieldComponent
						name={field}
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
						placeholder={model[field].placeholder}
						// innerRef={this.props.createInputRef ? this.props.createInputRef(field) : null}
						onChange={this.handleChange}
						color={!validation[field] ? '#BE4F44' : undefined}
						focusColor={(!validation[field] ? '#BE4F44' : undefined)}
						value={values[field].value}
						{...this.props}
					/>
				)				
		}
	}	
	
	handleChange = (e) => {
		const field = e.target.name
		const value = e.target.value
		// const { model } = this.props
		// const validator = model[field].validate
		
		// const validator = child.props.validate ?
		// 	child.props.validate : child.type.name === 'Select' ?
		// 		required : null
		
		this.setState({ values: { ...this.state.values[field].value, [field]: value } }, this.validateForm)
		
		
		// if (validator) {
		// 	if (validator(value)) {
		// 		// NOT VALID
		// 		this.setState({
		// 			errors: {
		// 				...this.state.errors,
		// 				[name]: validator(value)
		// 			},
		// 			validation: {
		// 				...this.state.validation,
		// 				[name]: false
		// 			}
		// 		}, this.validateForm)
		// 	}
		// 	else {
		// 		this.setState({
		// 			// VALID
		// 			errors: {
		// 				...this.state.errors,
		// 				[name]: ''
		// 			},
		// 			validation: {
		// 				...this.state.validation,
		// 				[name]: true
		// 			}
		// 		}, this.validateForm)
		// 	}
		// }
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

/* 
1: Print all fields in model 
2: createFieldComponent for each field in model			

*/

// Object.keys(validation).every((value) => validation[value] === true)
