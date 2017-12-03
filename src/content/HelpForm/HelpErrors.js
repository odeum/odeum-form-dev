import React from 'react'

const HelpErrors = ({ helpErrors }) =>
	<div>
		{Object.keys(helpErrors).map((fieldName, i) => {
			if (helpErrors[fieldName].length > 0) {
				return (
					<p key={i}>{fieldName} {helpErrors[fieldName]}</p>
				)
			} else {
				return ''
			}
		})}
	</div>

export default HelpErrors