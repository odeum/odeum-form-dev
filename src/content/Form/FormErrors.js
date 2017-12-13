import React from 'react'

const FormErrors = ({ errors }) =>
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

export default FormErrors