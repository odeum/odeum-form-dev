import React, { Component } from 'react'


export class Clock extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			time: get24HourTime(this.props.seconds && 's')
		}
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		)
	}
	
	componentWillUnmount() {
		clearInterval(this.timerID)
	}


	tick() {
		this.setState({
			time: get24HourTime(this.props.seconds && 's')
		})
	}

	render() {
		return <span>{this.state.time}</span>
	}
}

function get24HourTime(arg) {
	let now = new Date()
	let h, m, s
	h = now.getHours()
	m = now.getMinutes()
	s = now.getSeconds()
	if (h < 10)
		h = '0' + h
	if (m < 10)
		m = '0' + m
	if (s < 10)
		s = '0' + s
	if (arg === 's') return `${h}:${m}:${s}`
	return `${h}:${m}`
}
