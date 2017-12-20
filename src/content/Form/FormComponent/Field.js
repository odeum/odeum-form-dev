import React from 'react'
import { StyledInput } from './FormStyles'

const Field = (props) => {	
	return (
		<StyledInput
			type={props.type}
			innerRef={props.createInputRef ? props.createInputRef(props.name) : null}
			onChange={props.handleChange}
			{...props}
		/>
	)
}

export default Field
