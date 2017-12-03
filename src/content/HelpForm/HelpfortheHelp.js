import React, { Component } from 'react'
import { DoublePanel, InputGreen, Panel } from './HelpStyles'
export default class HelpNew extends Component {
	constructor(props) {
		super(props)

		this.state = {
			locale_content: {
				en: {
					helptitle: '',
					helpdescription: '',
					help_content: {
						text: '',
						image: '',
						video: '',
						link: '',
						svg: '',
						pdf: '',
						document: ''
					}
				},
				da: {
					helptitle: '',
					helpdescription: '',
					help_content: {
						text: '',
						image: '',
						video: '',
						link: '',
						svg: '',
						pdf: '',
						document: ''
					}
				}
			}
		}
	}

	handleContentChange = (e) => {
		this.setState({
			locale_content: {
				...this.state.locale_content,
				[e.target.lang]: {
					...this.state.locale_content[e.target.lang],
					help_content: {
						...this.state.locale_content[e.target.lang].help_content,
						[e.target.name]: e.target.value
					}
				}
			}
		})
	}
	/* For Title and Description */
	handleChange = (e) => {

		this.setState({
			locale_content: {
				...this.state.locale_content,
				[e.target.lang]: {
					...this.state.locale_content[e.target.lang],
					[e.target.name]: e.target.value
				}
			}

		})
	}
	render() {
		const { en, da } = this.state.locale_content

		return (
			<DoublePanel>
				{/* Start EN */}
				<Panel>
					<form>
						<InputGreen value={en.helptitle} name={'helptitle'} onChange={this.handleChange} lang={'en'} />
						<InputGreen value={en.helpdescription} name={'helpdescription'} onChange={this.handleChange} lang={'en'} />
						<InputGreen value={en.help_content.text} name={'text'} onChange={this.handleContentChange} lang={'en'} />
						<InputGreen value={en.help_content.image} name={'image'} onChange={this.handleContentChange} lang={'en'} />
						<InputGreen value={en.help_content.link} name={'link'} onChange={this.handleContentChange} lang={'en'} />
						<InputGreen value={en.help_content.video} name={'video'} onChange={this.handleContentChange} lang={'en'} />
						<InputGreen value={en.help_content.svg} name={'svg'} onChange={this.handleContentChange} lang={'en'} />
						<InputGreen value={en.help_content.pdf} name={'pdf'} onChange={this.handleContentChange} lang={'en'} />
						<InputGreen value={en.help_content.document} name={'document'} onChange={this.handleContentChange} lang={'en'} />
					</form>
				</Panel>
				{/* End EN */}
				{/* Start DA */}
				<Panel>
					<form>
						<InputGreen value={da.helptitle} name={'helptitle'} onChange={this.handleChange} lang={'da'} />
						<InputGreen value={da.helpdescription} name={'helpdescription'} onChange={this.handleChange} lang={'da'} />
						<InputGreen value={da.help_content.text} name={'text'} onChange={this.handleContentChange} lang={'da'} />
						<InputGreen value={da.help_content.image} name={'image'} onChange={this.handleContentChange} lang={'da'} />
						<InputGreen value={da.help_content.link} name={'link'} onChange={this.handleContentChange} lang={'da'} />
						<InputGreen value={da.help_content.video} name={'video'} onChange={this.handleContentChange} lang={'da'} />
						<InputGreen value={da.help_content.svg} name={'svg'} onChange={this.handleContentChange} lang={'da'} />
						<InputGreen value={da.help_content.pdf} name={'pdf'} onChange={this.handleContentChange} lang={'da'} />
						<InputGreen value={da.help_content.document} name={'document'} onChange={this.handleContentChange} lang={'da'} />
					</form>
				</Panel>
				{/* End DA */}
			</DoublePanel>
		)
	}
}
