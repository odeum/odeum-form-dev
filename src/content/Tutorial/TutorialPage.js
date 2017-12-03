import React, { Component } from 'react'
import { LinkButton } from 'odeum-ui'
import { GridWrapper, GridItem } from '../Homepage/HomepageStyles'

class TutorialPage extends Component {
	render() {
		return (
			<div>
				<GridWrapper>
					<GridItem>1</GridItem>
					<GridItem>2</GridItem>
					<GridItem>3</GridItem>
					<GridItem>4</GridItem>
					<GridItem>5</GridItem>
					<GridItem>6</GridItem>
					<GridItem>7</GridItem>
					<GridItem>8</GridItem>
				</GridWrapper>
				<LinkButton label={'Go to login'} icon={'lock_outline'} route={'/login'} color={'#13A085'} />
			</div>
		)
	}
}

export default TutorialPage
