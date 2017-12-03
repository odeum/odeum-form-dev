import React, { Component } from "react"

const emoji = {
	sleeping: String.fromCodePoint(0x1F634),
	sleep: String.fromCodePoint(0x1F4A4),
	icecream: String.fromCodePoint(0x1F366),
	sparkle: '\u2728',
	stophand: '\u270B'
}

class Idle extends Component {
	static defaultProps = {
		render: () => null,
		onChange: () => { },
		timeout: 1000,
		events: ["mousemove", "mousedown", "keydown", "touchstart", "scroll"]
	}

	state = {
		idle: true
	}

	timeout = null

	componentDidMount() {
		this.props.events.forEach(event => {
			window.addEventListener(event, this.handleEvent)
		})
	}

	componentWillUnmount() {
		this.props.events.forEach(event => {
			window.removeEventListener(event, this.handleEvent)
		})
	}

	handleChange(idle) {
		this.props.onChange({ idle })
		this.setState({ idle })
	}

	handleEvent = () => {
		if (this.state.idle) {
			this.handleChange(false)
		}
		clearTimeout(this.timeout)
		this.timeout = setTimeout(() => {
			this.handleChange(true)
		}, this.props.timeout)
	}

	render() {
		return this.props.render(this.state)
	}
}

class IdleState extends Component {

	renderIdleNull = ({ idle }) => {
		return (
			null
		)
	}

	renderIdleState = ({ idle }) => {
		return (
			<span>
				{idle
					? emoji.sleeping + ' '
					: emoji.stophand + ' '
				}
			</span>
		)
	}

	render() {
		return (
			<Idle
				onChange={this.renderIdleNull}
				timeout={1000}
				render={this.renderIdleState} />
		)
	}
}

export default IdleState