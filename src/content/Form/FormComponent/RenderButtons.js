import React from 'react'
import { ButtonPanel, Button } from 'odeum-ui'

const RenderButtons = () => {
	const { isFormValid } = this.state
	return (
		<ButtonPanel justify={'left'} >
			<Button
				label={'Save'}
				icon={'check'}
				onClick={this.handleSubmit}
				disabled={!isFormValid}
				isDisabled={!isFormValid}
				color={isFormValid ? '#13A085' : ''}
			/>
			<Button
				label={'Reset'}
				icon={'close'}
				type={'reset'}
				onClick={this.handleResetInput}
				color={'#BE4F44'}
			/>
			<Button
				label={!isFormValid ? 'Validate' : 'Invalidate'}
				icon={!isFormValid ? 'check_circle' : 'cancel'}
				type={'reset'}
				onClick={this.handleToggleValidate}
				color={!isFormValid ? '#13A085' : '#BE4F44'}
			/>
		</ButtonPanel>
	)
}

export default RenderButtons