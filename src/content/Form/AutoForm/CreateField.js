import React, { Component } from 'react'



class CreateField extends Component {

	render() {
		const { model } = this.props

		const FieldComponent = icons[icon].component
		return <FieldComponent size={iconSize} color={this.setColor(active)} style={style} />
	}
}

export default CreateField

