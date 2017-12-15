import React from 'react'

export const FormErrors = ({ errors }) =>
	<div>
		{Object.keys(errors).map((fieldName, i) => {
			if (errors[fieldName].length > 0) {
				return (
					<p key={i}>{fieldName}: {errors[fieldName]}</p>
				)
			} else {
				return ''
			}
		})}
	</div>


export const FieldError = (props) => {
	const { error, name } = props
	if (error !== undefined && error.length > 0) {
		return (
			<div>
				{name}: {error}
			</div>
		)
	} else return ''
}

