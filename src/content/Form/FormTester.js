import React, { Component } from 'react'
import { ButtonPanel, Button } from 'odeum-ui'
// import { DisplayState } from './FormComponent/DisplayStateProps'
import Form from './FormComponent/Form' // odeum-form
// import Field from './FormComponent/Field'
import { FirstName, LastName, Number, Email, Password, Phone, Select, TextArea, Date, /* Checkbox, */ Switch } from './FormComponent/Fields' // odeum-form
// import RenderButtons from './FormComponent/RenderButtons'
import { FormErrors, FieldError } from './FormErrors'
import { getGlobal } from '../utils/globals'

import {
	composeValidators,
	isEmail,
	minChars,
	isPhoneNumber, 
	hasLower,
	hasUpper,
	hasSymbol,
	hasNumber,
	required, 
	// auto, 
	mustBeLetters,
	maxChars,
	// formattedDate, 
	mustBeNumber,
	mustBePositive, 
	mustBeEqualTo, 
	// mustBeNegative, 
} from './FormComponent/Validators' // odeum-form-validators


// App or other higher level component composing the form and issues the form state and utility methods for submit ...
class FormTester extends Component {

	constructor(props) {
		super(props)

		this.model = {
			values: {
				firstname: '',
				lastname: '',
				email: '',
				password: '',
				country: '',
				phone: '',
				age: '',
				description: '',
				date: '',
				// bikeowner: '',
				news: false,
				// phone2: '',
			}
		}

		this.state = {
			values: '',
			errors: '',
			isFormValid: false,
			reset: false,
		}
	}

	handleChange = (state) => {
		this.setState({ 
			values: state.values,
			isFormValid: state.isFormValid
		})
	}

	handleError = (errors) => {
		this.setState({ errors: errors })
	}

	clearForm = () => {
		this.setState({ reset: false })
	}

	handleSubmit = () => {
		console.log('Submitting data ...', this.state.values)
		// this.setState({ values: '', errors: '', isFormValid: false })
		this.handleReset()
	}

	handleReset = () => {
		this.setState({ reset: true, isFormValid: false, values: '', errors: '' }, this.clearForm)
	}

	render() {
		const { errors, values, reset } = this.state
		return (
			<div>
				<h1>Form component test</h1>
				<p>Please fill out the following form fields:</p>

				<div style={{ width: '50%' }}>
					<Form
						focusfield={'firstname'}
						model={this.model.values}
						onSubmit={this.handleSubmit}
						onReset={this.handleReset}
						reset={reset}
						onError={this.handleError}
						onChange={this.handleChange}
						allowKeys={{ 'esc': true, 'enter': true }}
						debug
					>

						<FirstName
							name={'firstname'}
							placeholder={'Enter your firstname'}
							validate={composeValidators(mustBeLetters, mustBeEqualTo('Christian'))} 
						/>

						<LastName
							name={'lastname'}
							placeholder={'Enter your lastname'}
							validate={mustBeLetters}
						/>

						<Email
							name={'email'}
							placeholder={'Enter your mail address ... '}
							validate={isEmail}
						/>

						<FieldError error={errors['email']} name={'email'}/>	

						<Password
							name={'password'}
							placeholder={'Enter your password ... '}
							validate={composeValidators(minChars(8), hasLower, hasUpper, hasSymbol, hasNumber)}
						/>
						
						<Phone
							name={'phone'}
							placeholder={'Enter your phone number'}
							validate={isPhoneNumber}
						/>
						
						<Select 
							name={'country'}
							validate={mustBeEqualTo('Denmark')}
						>
							<option value={''}>Select your country</option>
							<option value={'Denmark'}>Denmark</option>
							<option value={'Germany'}>Germany</option>
							<option value={'Norway'}>Norway</option>
							<option value={'Sweden'}>Sweden</option>
							<option value={getGlobal('myGlobal')}>Easter Egg</option>
						</Select>

						<Phone
							name={'phone2'}
							placeholder={'Enter your phone number 2 ... '}
							value={values['country']}
							readOnly
							disabled
						/>

						<Number
							name={'age'}
							placeholder={'Enter your age'}
							validate={composeValidators(maxChars(3), mustBeNumber, mustBePositive)}
						/>

						<TextArea 
							name={'description'}
							placeholder={`Please enter a short description of your JavaScript superpowers ... (minimum 20, maximum 100 characters) ${getGlobal('myGlobal')}`}
							validate={composeValidators(minChars(20), maxChars(100))}
							maxLength={'100'}						
						/>

						<Date 
							name={'date'} 
							width={'175px'}
							validate={required}
						/> 
					
						{/* <Checkbox 
							name={'bikeowner'}
							checked={values['bikeowner']}
						/> */}

						{/* <label htmlFor='bikeowner'>Bikeowner</label>
						<input type="checkbox" id={'bikeowner'} name={''} /> */}

						<Switch 
							name={'news'}
							checked={values['news']}
						/>

						<div>Unwanted DOM child that eventually will be a styling part. {getGlobal('myGlobal2')}</div>

						<ButtonPanel justify={'left'} >
							<Button
								label={'Submit'}
								icon={'check'}
								onClick={this.handleSubmit}
								disabled={!this.state.isFormValid}
								isDisabled={!this.state.isFormValid}
								color={this.state.isFormValid ? '#13A085' : ''}
							/>
							<Button
								label={'Reset'}
								icon={'close'}
								type={'reset'}
								onClick={this.handleReset}
								color={'#BE4F44'}
							/>
						</ButtonPanel>
					</Form>
				</div>
				{/* <DisplayState {...this.state} /> */}
				<FormErrors errors={errors} />
				{errors['email']}
			</div>
		)
	}
}

export default FormTester


