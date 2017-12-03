import React, { Component } from 'react'
import { Button } from 'odeum-ui'

class HelpList extends Component {
	render() {
		return (
			<div>
				<h1>Help items list</h1>
				<p>Rendering list ... </p>

				<Button
					label={'Create New'}
					onClick={this.props.handleNew}
				/>
			</div>
		)
	}
}

export default HelpList

