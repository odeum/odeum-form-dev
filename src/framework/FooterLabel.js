import React from 'react'
import IdleState from './IdleState'

export const handleLink = () => {
	return '/'
}



export const FooterLabel = () => {
	const date = new Date()
	return (
		<div>
			<strong>ODEUM Code</strong> v0.2.29 © Copyright
			{' '}{date.getFullYear()}{' '}
			<IdleState />{' '}
		</div>
	)
}
