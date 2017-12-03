import React, { Component } from 'react'
import { LinkButton, Button } from 'odeum-ui'
import { Redirect } from 'react-router-dom'

export const GotoRoute = (route) => <Redirect to={{ pathname: route }}/>


class LoginPage extends Component {

	renderIsLoggedIn = () => {
		return (
			<div>				
				<p>Login successful ... </p>
				<Button label={'Log out'} icon={'lock_open'} color={'#E74C3C'} onClick={this.handleLogout} />
				<LinkButton label={'Homepage'} icon={'menu'} route={'/'} color={'#13A085'} />
			</div>
		)
	}

	renderNotLoggedIn = () => {
		return (
			<div>
				<p>You are not logged in ... </p>
				<Button label={'Login'} icon={'lock_outline'} color={'#13A085'} onClick={this.handleLogin} />
			</div>
		)
	}

	handleLogin = () => {
		this.props.onLogin(true) // Login successful ... 
	}

	handleLogout = () => {
		this.props.onLogin(false) // Log out ...
	}

	render() {
		return (
			<div>
				{this.props.loggedIn ? this.renderIsLoggedIn() : this.renderNotLoggedIn()}
			</div>
		)
	}
}

export default LoginPage
