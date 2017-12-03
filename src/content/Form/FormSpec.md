# Form specifications (odeum-form)

ODEUM Form is a toolbox for creating simple validated React forms. ODEUM Forms wraps native HTML form DOM elements and exhibits an API of controlled inputs through "controlled components". 

## Basic requirements

- A form should be able to contain a number of fields with a certain type of value. 
- A form can accept external errors to invalidate form fields (e.g. server response errors etc.)
- A field should be able to be disabled (boolean) 
- A field should be able to be validated against a validation rule (type specific)
- A field uses event handlers for different states of the form


```js
import { Form, Input, Select, Textarea, Label, Validator } from 'odeum-form'
```

## Validation rules
- Validation Array (array of rules)

## Components
- Form
- Input
- Select
- Textarea
- Button (odeum-ui or new <FormButton type={'submit/reset} />)

## Form props
- id
- log (boolean - console.log events etc.)

## Field props
- type
- required (mutated in a validator?)
- placeholder
- name
- value
- disabled
- onChange
- innerRef
- color (text color)
- focusColor (color of box when in focus)

## State
- values
- touched (dirty)
- pristine (untouched)
- errors (formErrors)
- warnings (formWarnings)
- successes

## Handlers
- onChange (v)
- onBlur (v)
- onFocus (v)
- onSubmit
- onMouseEnter (v)
- OnMouseLeave (v)
- onError
- onValid
- onTouched

## Model
- How and what?

## Inspiration

- [react-validation](https://www.npmjs.com/package/react-validation)
- [formsy-react](https://www.npmjs.com/package/formsy-react)
- [formik]
- [redux-form]


## Problems (issues)

- autocomplete={'false'} 
- autocomplete={'on'} 
- readonly
- onFocus


```js
<Email 
	type={'email'} 
	// required 
	placeholder={'Mail address'} 
	name={'email'} 
	value={this.state.email}
	onChange={this.handleUserInput}
	innerRef={this.createRef}
	color={!this.state.emailValid ? '#BE4F44' : undefined}
	focusColor={!this.state.emailValid ? '#BE4F44' : undefined}
	readonly 
	onfocus={this.handleOnFocus}
	autocomplete={'false'}
/>		
```

## API
```js
import { Form, Input, Select, Textarea, Label, Validator } from 'odeum-form'

...

<Form>
	
</Form>

```
