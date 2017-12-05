import React from 'react'

export const DisplayState = props =>
	<div style={{ margin: '1rem 0' }}>
		<pre
			style={{
				background: '#f6f8fa',
				fontSize: '1.5rem',
				padding: '.5rem',
			}}
		>
			<strong>{props.title ? `State for ${props.title}` : 'State'}</strong> ={' '}
			{JSON.stringify(props, null, 2)}
		</pre>
	</div>

export const DisplayProps = props =>
	<div style={{ margin: '1rem 0' }}>
		<pre
			style={{
				background: '#f6f8fa',
				fontSize: '1.5rem',
				padding: '.5rem',
			}}
		>
			<strong>{props.title ? `Props for ${props.title}` : 'Props'}</strong> ={' '}
			{JSON.stringify(props, null, 2)}
		</pre>
	</div>
