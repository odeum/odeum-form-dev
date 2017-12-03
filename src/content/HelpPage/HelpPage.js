import React, { Component } from 'react'

import HelpEdit from '../HelpForm/HelpEdit'
import HelpNew from '../HelpForm/HelpNew'
import HelpList from './HelpList'

//import HelpNew from '../HelpForm/HelpfortheHelp'

class HelpPage extends Component {
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
				<HelpList 
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
	
	renderHelpEdit = () => {
		return (
			<div>
				<HelpEdit
					onSubmit={this.handleOnSubmitEdit}
				/>
			</div>
		)
	}

	// Section: New help item 
	handleOnSubmitNew = (newModel) => {
		this.setState({ mode: { new: false, list: true } })
	
		let newModelArray = [...this.state.model]
		// newModelArray.push({ email: newModel.email, password: newModel.password })
		newModelArray.push({ help_title: newModel.help_title })
		this.setState({ model: newModelArray })
	}

	renderHelpNew = () => {
		return (
			<div>
				<HelpNew 
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
						this.state.mode.edit ? this.renderHelpEdit() : 
							this.state.mode.new ? this.renderHelpNew() : null
				}
			</div>
		)
	}
}

export default HelpPage