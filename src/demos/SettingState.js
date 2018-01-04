import React, { Component } from 'react'
import { DisplayState, DisplayProps } from '../content/Form/FormComponent/DisplayStateProps'

const Frapper = (props) => {
	return (
		<React.Fragment>
			{props.children}
		</React.Fragment>
	)
}

class SettingState extends Component {
	constructor(props) {
		super(props)

		this.state = {
			counter: 0,
			callbacks: 0,
		}
	}

	callback = () => {
		console.log('Callback initiated ... ')
		this.setState((prevState, props) => ({ 
			callbacks: prevState.callbacks + 1 
		}))
	}

	setState1 = () => {
		this.setState({ counter: 10 })
	}

	setState2 = () => {
		this.setState({ counter: 20 }, this.callback)
	}

	setState3 = () => {
		this.setState((prevState, props) => ({
			counter: prevState.counter + 1
		}))
	}

	setState4 = () => {
		this.setState((prevState, props) => ({
			counter: prevState.counter + props.increment
		}), () => this.callback())
	}

	render() {
		return (
			<Frapper>
				<div>
					<button onClick={this.setState1}>setState 10 - {this.state.counter}</button>
					<button onClick={this.setState2}>setState 20 - {this.state.counter}</button>
					<button onClick={this.setState3}>setState + 1 - {this.state.counter}</button>
					<button onClick={this.setState4}>setState + props.increment - {this.state.counter}</button>
					<DisplayState {...this.state} />
					<DisplayProps {...this.props} />
				</div>
				<div>Hello World</div>
			</Frapper>
		)
	}
}

export default SettingState

