import React, { Component } from 'react'
import { ButtonPanel, Button } from 'odeum-ui'

import { DoublePanel, InputGreen, Panel } from './HelpStyles'
import HelpErrors from './HelpErrors'

class HelpNew extends Component {
	constructor(props) {
		super(props)

		this.inputRefs = {}

		this.state = {
			locale_content: {
				en: {
					helptitle: ''
				},
				da: {
					helptitle: ''
				}
			},
			helpErrors: { locale_content: { en: { helptitle: '' } } },
			helptitlelValid: false,
			helpValid: false,
			inFocus: ''
		}
	}

	// Lifecycle Methods

	componentDidMount() {
		// this.handleResetInput()
		this.focusHelpTitleInput()
		document.addEventListener('keydown', this.onKeydown)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeydown)
	}

	onKeydown = ({ keyCode }) => {
		switch (keyCode) {
			case 27: // ESCAPE
				this.handleResetInput()
				break
			case 13: // ENTER
				break
			default:
				break
		}
	}

	handleResetInput = () => {
		this.setState({
			locale_content: {
				en: {
					helptitle: ''
				},
				da: {
					helptitle: ''
				}
			}
		})
		this.focusHelpTitleInput()
	}

	handleContentChange = (e) => {
		this.setState({
			locale_content: {
				...this.state.locale_content,
				[e.target.lang]: {
					...this.state.locale_content[e.target.lang],
					help_content: {
						...this.state.locale_content[e.target.lang].help_content,
						[e.target.name]: e.target.value
					}
				}
			}
		})
	}

	handleChange = (e) => {
		this.setState({
			locale_content: {
				...this.state.locale_content,
				[e.target.lang]: {
					...this.state.locale_content[e.target.lang],
					[e.target.name]: e.target.value
				}
			}
		
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		console.log('Help submitted ... ')
		this.props.onSubmit(this.state)
	}

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.helpErrors
		let helptitleValid = this.state.locale_content.en.helptitleValid

		switch (fieldName) {
			case 'help_title':
				// helptitleValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
				// fieldValidationErrors.helptitle = helptitleValid ? '' : ' is invalid'
				helptitleValid = value.length >= 1
				fieldValidationErrors.locale_content.en.helptitleValid = helptitleValid ? '' : ' is too short'
				break
			default:
				break
		}

		this.setState({
			helpErrors: fieldValidationErrors,
			helptitleValid: helptitleValid,
		}, this.validateHelp)
	}

	validateHelp() {
		this.setState({ helpValid: this.state.en.locale_content.helptitleValid })
	}

	errorClass(error) {
		
		return (error.length === 0 ? '' : 'has-error')
		// return (error.length === 0 ? false : true)
	}

	inputError(error) {
		return (error.length === 0 ? false : true)
	}

	createRef = (input) => {
		this.helptitleInput = input
	}

	focusHelpTitleInput = () => {
		this.helptitleInput.focus()
	}

	handleFocus = () => {
	}

	handleBlur = () => {
	}

	handleMouse = (passage) => (e) => {
		e.preventDefault()
	}

	render() {
		const { en, da } = this.state.locale_content

		return (
			<div>
				<h1>Help Demo</h1>
				<p>Please enter your help item:</p>
				<DoublePanel>
					<Panel>
						<form>
							<InputGreen value={en.helptitle} innerRef={this.createRef} name={'helptitle'} onChange={this.handleChange} lang={'en'} />
						</form>
					</Panel>
					<Panel>
						<form>
							<InputGreen value={da.helptitle} name={'helptitle'} onChange={this.handleChange} lang={'da'} />
						</form>
					</Panel>
				</DoublePanel>
				<ButtonPanel justify={'left'} >
				
					<Button
						label={'Save'}
						icon={'check'}
						type={'submit'}
						onClick={this.handleSubmit}
						disabled={!this.state.helpValid}
						isDisabled={!this.state.helpValid}
						color={this.state.helpValid ? '#13A085' : ''}
						onSubmit={this.handleOnSubmit}
					/>
				
					<Button
						label={'Reset'}
						icon={'close'}
						type={'reset'}
						onClick={this.handleResetInput}
						color={'#BE4F44'}
					/>
				
				</ButtonPanel>
				<div>
					<HelpErrors helpErrors={this.state.helpErrors} />
					{`${this.errorClass(this.state.locale_content.en.helptitle)}`}{' '}
				</div>
			</div>
		)
	}
}

export default HelpNew
