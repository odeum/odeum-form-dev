import React, { Component } from 'react'
import { Menu } from 'odeum-app'
import FormNew from '../content/Form/FormNew'

export class Page extends Component {
	render() {
		return (
			<Menu {...this.props} />
		)
	}
}

export class Login extends Component {
	render() {
		return (
			<div>
				{this.props.form}
				{this.props.action}
				{this.props.children}
			</div>
		)
	}
}

export class LoginTester extends Component {

	FormComponent = () =>
		<div>
			<FormNew />
		</div>

	ActionComponent = () =>
		<div>
			<p>Action Component</p>
		</div>



	render() {
		return (
			<div>
				<Login form={<this.FormComponent />} action={<this.ActionComponent />} />				
			</div>
		)
	}
}

