import React, { PureComponent } from 'react'
import { StyledInput } from './FormStyles'

// Called by Common Field Component
class Field extends PureComponent {

	// inputRefs = {}

	// createInputRef = (name) => (input) => {
	// 	return this.inputRefs[name] = input
	// }
	
	// focusInputRef = (name) => {
	// 	this.inputRefs[name].focus()
	// }
	
	// componentDidMount() {
	// 	console.log(this.inputRefs)
	// 	// this.props.getRefs()
	// }

	render() {		
		return (
			<div>
				<StyledInput 
					// innerRef={this.createInputRef(this.props.name)}
					{...this.props} 
				/>				
			</div>
		)
	}
}

export default Field

