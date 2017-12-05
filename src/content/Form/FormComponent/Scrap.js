getValueFromChild = (child) => {
	switch (child) {
		case Email: {
			console.log('Email value: ', this.state.values.email)
			return this.state.values.email
		}
		case Password: {
			console.log('Password value: ', this.state.values.password)
			return this.state.values.password
		}
		default:
			return null
	}
}


	// handleChange = (e) => {
	// 	const name = e.target.name
	// 	const value = e.target.value
	// 	this.setState({ values: { ...this.state.values, [name]: value } })
	// }


{/* <ButtonPanel justify={'left'} >

					<Button
						label={'Save'}
						icon={'check'}
						type={'submit'}
						onClick={this.handleSubmit}
						// disabled={!this.state.formValid}
						// isDisabled={!this.state.formValid}
						color={'#13A085'}
						// color={this.state.formValid ? '#13A085' : ''}
					// onSubmit={this.handleSubmit}
					/>

					<Button
						label={'Reset'}
						icon={'close'}
						// type={'reset'}
						onClick={this.handleResetInput}
						color={'#BE4F44'}
					/>

				</ButtonPanel> */}

				
nextField = () => {
	console.log(document.querySelectorAll("input"))
	console.log(this.inputRefs)

	const inputs = Array.prototype.slice.call(document.querySelectorAll("input"))
	const index = (inputs.indexOf(document.activeElement) + 1) % inputs.length
	const input = inputs[index]
	input.focus()
	input.select()
}
