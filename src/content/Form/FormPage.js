import React, { Component } from 'react'

import FormEdit from './FormEdit'
import FormNew from './FormNew'
import FormList from './FormList'

class FormPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			mode: {
				list: false,
				new: false,
				edit: false
			},
			model: []
		}
	}

	componentDidMount() {
		this.setState({ mode: { list: true } })
	}

	// Section: List items and accept new and edit

	handleNew = () => {
		this.setState({ mode: { new: true, list: false, edit: false } })		
	}

	handleEdit = () => {
		this.setState({ mode: { new: false, list: false, edit: true } })
	}

	renderList = () => {
		console.log('state: ', this.state.model)
		return (
			<div>
				<FormList 
					handleNew={this.handleNew} 
					handleEdit={this.handleEdit}
					data={this.state.model}
				/>
			</div>
		)
	}

	// Section: Edit help item 
	handleOnSubmitEdit = () => {
		this.setState({ mode: { new: false, list: true } })
	}
	
	renderFormEdit = () => {
		return (
			<div>
				<FormEdit
					onSubmit={this.handleOnSubmitEdit}
				/>
			</div>
		)
	}

	// Section: New help item 
	handleOnSubmitNew = (newModel) => {
		this.setState({ mode: { new: false, list: true } })
	
		let newModelArray = [...this.state.model]
		newModelArray.push({ email: newModel.email, password: newModel.password })
		this.setState({ model: newModelArray })
	}

	renderFormNew = () => {
		return (
			<div>
				<FormNew 
					onSubmit={this.handleOnSubmitNew} 
				/>
			</div>
		)
	}


	render() {
		return (
			<div>
				{
					this.state.mode.list ? this.renderList() : 
						this.state.mode.edit ? this.renderFormEdit() : 
							this.state.mode.new ? this.renderFormNew() : null
				}
			</div>
		)
	}
}

export default FormPage
