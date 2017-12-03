import React, { Component } from 'react'
import { Button } from 'odeum-ui'

class FormList extends Component {

	render() {
		return (
			<div>
				<h1>Form List Data</h1>
				<p>Rendering list of form data ... </p>
				<ul>
					{this.props.data.map((item, index) =>
						<li key={index}>{item.email} - {item.password}</li>
					)}
				</ul>

				<Button
					label={'Create New'}
					icon={'add_circle'}
					onClick={this.props.handleNew}
				/>
			</div>
		)
	}
}

export default FormList
