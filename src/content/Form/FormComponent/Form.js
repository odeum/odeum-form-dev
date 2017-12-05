import React, { Component } from 'react'
import { ButtonPanel, Button } from 'odeum-ui'
import { DisplayState } from './DisplayStateProps'

class Form extends Component {

	constructor(props) {
		super(props)

		this.inputRefs = {}

		this.state = {
			values: {},
			formErrors: { email: '', password: '' },
			emailValid: false,
			passwordValid: false,
			formValid: false,
			inFocus: '',
			refCount: ''
		}
	}

	componentDidMount() {
		this.setState({ values: this.props.model })
		const { focusfield } = this.props
		if (focusfield) {
			this.focusInputRef(focusfield)
		}
		document.addEventListener('keydown', this.onKeydown)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeydown)
		this.inputRefs = {} // Reset input refs
	}

	onKeydown = ({ keyCode }) => {
		switch (keyCode) {
			case 27: // ESCAPE
				this.handleResetInput()
				break
			case 13: // ENTER				
				if (this.state.formValid) {
					console.log('ENTER on valid')
					this.props.onSubmit(this.state)
				}
				else if (document.activeElement.name === 'email') {
					this.focusInputRef('password')
				}
				else if (document.activeElement.name === 'password') {
					this.focusInputRef(this.props.focusfield)
				}
				break
			default:
				break
		}
	}

	handleResetInput = () => {
		// if arg(fields) { this.setState({ fields, ... }) }
		// this.setState({
		// 	values: this.props.model,
		// 	formErrors: { email: '', password: '' },
		// 	emailValid: false,
		// 	passwordValid: false,
		// 	formValid: false,
		// })
		this.setState({ values: this.props.model })		
		this.focusInputRef(this.props.focusfield)
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
		return this.inputRefs[name] = input
	}

	focusInputRef = (name) => {
		this.inputRefs[name].focus()
	}

	handleFocus = () => {
		let refCount = Object.keys(this.inputRefs).length
		let currentFocus = document.activeElement.name
		this.setState({ inFocus: currentFocus, refCount: refCount })
	}

	// FORM RENDER
	render() {
		return (
			<div>			
				<form // onSubmit={this.handleSubmit }					
					{...this.props}>

					{React.Children.toArray(this.props.children).map((child, index) => {
						let currentChild = child.type.name.toLowerCase()
						return React.cloneElement(child, {
							key: index,
							// value: this.getValueFromChild(currentChild),
							value: this.state.values[currentChild],
							createInputRef: this.createInputRef,
							handleChange: this.handleChange,
							handleFocus: this.handleFocus,
						})
					})}

					<ButtonPanel justify={'left'} >
						<Button
							label={'Save'}
							icon={'check'}
							// type={'submit'}
							onClick={this.handleSubmit}
							disabled={!this.state.formValid}
							isDisabled={!this.state.formValid}							
							color={this.state.formValid ? '#13A085' : ''}
							// onSubmit={this.handleSubmit} 
						/>
						<Button
							label={'Reset'}
							icon={'close'}
							type={'reset'}
							onClick={this.handleResetInput}
							color={'#BE4F44'}
						/>						
					</ButtonPanel>
				</form>
				<p>{' '}</p>
				<DisplayState {...this.state} title={'Form'} />
			</div>
		)
	}
}

export default Form