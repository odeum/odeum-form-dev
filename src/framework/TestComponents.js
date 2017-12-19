import React, { Component } from 'react'
import { Menu } from 'odeum-app'
import FormNew from '../content/Form/FormNew'
import { Redirect } from 'react-router-dom'

export class Page extends Component {
	render() {
		const { protect } = this.props
		if (protect) {
			console.log(protect)
			return (
				<Redirect to={'/login'} />
				// <Menu route={'/login'} {...this.props}>
				// 	{this.props.children}
				// </Menu>
			) 
		}
		else 
			return ( 
				<Menu {...this.props} >
					{this.props.children}
				</Menu>
			)		 
	}
}

export class Login extends Component {
	render() {
		return (
			<div label={'Login'}>
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

