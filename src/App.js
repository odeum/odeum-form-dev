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
// import theme from './framework/theme'
import { Page/* , Login , LoginTester */ } from './framework/TestComponents'

// Content imports
import Homepage from './content/Homepage/Homepage'
import FormPage from './content/Form/FormPage'
import TutorialPage from './content/Tutorial/TutorialPage'
import LoginPage from './content/Login/LoginPage'



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
		return (
			<AppContainer>
				<Header logo={''}/>
				<MenuPanel>

					<Menu route={'/'} exact>
						<Homepage />
					</Menu>

					<Page route={'/login'}>
						{/* <LoginTester /> */}
						<LoginPage onLogin={this.handleLogin} loggedIn={this.state.isLoggedIn} />
					</Page>

					<Menu icon={'assignment'} label={'Form'} route={'/form'}>
						<Tab icon={'assignment'} label={'Form List'} route={'/formlist'}>
							<FormPage />
						</Tab>
						<Tab icon={'code'} label={'Tutorial'} route={'/tutorial'}>
							Tutorial ...
						</Tab>
					</Menu>

				</MenuPanel>
				<Footer label={FooterLabel} labelLink={handleLink()} helpID={'Logged in: ' + this.state.isLoggedIn} />
			</AppContainer>
		)
	}
}

export default App

