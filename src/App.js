import React, { Component } from 'react'

// Framework imports
import { 
	AppContainer,
	Header, 
	MenuPanel, 
	Menu,
	Tab,
	Footer } from 'odeum-app'

// Framework helper imports
import { FooterLabel, handleLink } from './framework/FooterLabel'
import { Page, /* Login ,  LoginTester*/ } from './framework/TestComponents'

// Content imports
import Homepage from './content/Homepage/Homepage'
import FormPage from './content/Form/FormPage'
import LoginPage from './content/Login/LoginPage'

// Form Component Tester
import FormTester from './content/Form/FormTester'
import FormDemo from './content/Form2/FormDemo'


class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			helpID: 0,
			isLoggedIn: false
		}
	}

	handleLogin = (loginState) => {
		this.setState({ isLoggedIn: loginState })
	}

	render() {
		const protect = !this.state.isLoggedIn
		return (
			<AppContainer>
				<Header/>
				<MenuPanel>

					<Page route={'/'}>
						<Homepage/>
					</Page>

					<Page label={'Login'} icon={'lock_outline'} route={'/login'}>
						<LoginPage onLogin={this.handleLogin} loggedIn={this.state.isLoggedIn}/>
					</Page>

					<Menu label={'Form'} icon={'assignment'} route={'/form'}>
						<Tab label={'Form List'} icon={'assignment'} route={'/formlist'}>
							<FormPage/>
						</Tab>
						<Tab label={'Form1'} icon={'code'} route={'/form1'}>
							<FormTester/>
						</Tab>
						<Tab label={'Form2'} icon={'code'} route={'/form2'}>
							<FormDemo/>
						</Tab>
					</Menu>

					{this.state.isLoggedIn ? 
						<Page label={'Protected'} route={'/protected'} protect={protect}>
							<FormTester />
						</Page>
						: null}

				</MenuPanel>
				<Footer label={FooterLabel} labelLink={handleLink()} helpID={'Logged in: ' + this.state.isLoggedIn}/>
			</AppContainer>
		)
	}
}

export default App

