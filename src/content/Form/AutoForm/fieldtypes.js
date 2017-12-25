import * as Fields from '../FormComponent/Fields'


export const fieldtypes = {
	email: {
		// name: 'email',
		component: Fields.Email,
	},

	password: {
		// name: 'password',
		component: Fields.Password,
	},
	
	phone: {
		name: 'phone',
		component: Fields.Phone,
	},

	firstname: {
		name: 'firstname',
		component: Fields.FirstName,
	},

	lastname: {
		name: 'lastname',
		component: Fields.LastName,
	},

	address: {
		name: 'address',
		component: Fields.Address,
	},

	number: {
		name: 'number',
		component: Fields.Number,
	},

	select: {
		name: 'select',
		component: Fields.Select,
	},

	country: {
		name: 'country',
		component: Fields.Select,
	},

	textarea: {
		name: 'textarea',
		component: Fields.TextArea,
	},

}
