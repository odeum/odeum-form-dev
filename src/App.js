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
import { setGlobal } from './content/utils/globals'

// Content/demo imports
import Homepage from './content/Homepage/Homepage'
import FormPage from './content/Form/FormPage'
import LoginPage from './content/Login/LoginPage'
import { Clock } from './demos/Clock'

// Form Component Tester
import FormTester from './content/Form/FormTester'
import AutoFormTester from './content/Form/AutoForm/AutoFormTester'

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			helpID: 0,
			isLoggedIn: false
		}
	}
	
	componentWillMount() {
		setGlobal('myGlobal', '--> This string is a global variable')
		setGlobal('myGlobal2', '--> This string is also a global variable')
	}
	

	handleLogin = (loginState) => {
		this.setState({ isLoggedIn: loginState })
	}

	renderHeader = () => {
		return (
			<div>
				<Clock />
				{FooterLabel()}
			</div>
		) 
	}

	render() {
		const protect = !this.state.isLoggedIn
		return (
			<AppContainer>
				<Header render={this.renderHeader}/>
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
						<Tab label={'Form'} icon={'code'} route={'/form1'}>							
							<FormTester/>
						</Tab>
						<Tab label={'AutoForm'} icon={'code'} route={'/autoform'}>
							<AutoFormTester/>
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

