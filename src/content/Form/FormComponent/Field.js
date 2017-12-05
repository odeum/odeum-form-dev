import React, { PureComponent } from 'react'
import { StyledInput } from './FormStyles'

// Called by Common Field Component
class Field extends PureComponent {
	render() {		
		return (
			<div>
				<StyledInput 
					{...this.props} 
				/>				
			</div>
		)
	}
}

export default Field

