import React from 'react'
import { ButtonPanel, LinkButton } from 'odeum-ui'
import { 
	AlignCenter, 
	HomepageHeader, 
	HomepageTagLine, 
	HomepageButonsContainer, 
	LinkTo, 
	HomepageButtonSpacer,
	HomepageFlexContainer,
	HomepageBox, 
	HomepageSectionHeader,
	HomepageSection, 
} from './HomepageStyles'

const Homepage = () => {
	return (
		<div>
			<AlignCenter>
				<HomepageHeader>ODEUM Form</HomepageHeader>
				<HomepageTagLine>Development and test of ODEUM Form React component for ODEUM Code Apps</HomepageTagLine>
				<HomepageButonsContainer>
					<ButtonPanel wrap={'wrap'}>

						<LinkButton label={'Form demo'} icon={'assignment'} route={'/form/formlist'}/>
						<HomepageButtonSpacer />
						<LinkButton label={'Form'} icon={'code'} route={'/form/form1'} />

					</ButtonPanel>
				</HomepageButonsContainer>

			</AlignCenter>
			
			<HomepageFlexContainer>

				<HomepageBox width={1 / 3} ml={40} mr={40}>					
					<HomepageSectionHeader>Declarative API</HomepageSectionHeader>
					<HomepageSection>ODEUM Form is a toolbox for creating simple validated React forms. ODEUM Forms wraps native HTML form DOM elements and exhibits an API of controlled inputs through "controlled components".</HomepageSection>
					<HomepageSection>ODEUM Form is a toolbox for creating simple validated React forms. ODEUM Forms wraps native HTML form DOM elements and exhibits an API of controlled inputs through "controlled components".</HomepageSection>
				</HomepageBox>

				<HomepageBox width={1 / 3} ml={40} mr={40}>					
					<HomepageSectionHeader>React components</HomepageSectionHeader>
					<HomepageSection>ODEUM Form is a toolbox for creating simple validated React forms. ODEUM Forms wraps native HTML form DOM elements and exhibits an API of controlled inputs through "controlled components".</HomepageSection>
					<HomepageSection>ODEUM Form is a toolbox for creating simple validated React forms. ODEUM Forms wraps native HTML form DOM elements and exhibits an API of controlled inputs through "controlled components".</HomepageSection>
				</HomepageBox>

				<HomepageBox width={1 / 3} ml={40} mr={40}>					
					<HomepageSectionHeader>Simple Form Setup</HomepageSectionHeader>
					<HomepageSection>Using our simple Form component you'll be on track with creating forms in minutes. Check it out in this <LinkTo to={'/form/formlist'}>Form Demo</LinkTo>. The Form component includes form field validation you configure very easily.</HomepageSection>
					<HomepageSection>Creating fast and simple forms in React has never been easier.</HomepageSection>
				</HomepageBox>
				
			</HomepageFlexContainer>
		</div>
	)
}

export default Homepage
