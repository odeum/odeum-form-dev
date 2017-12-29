export const setGlobal = (attr, value) => {
	window.attr = value
}

export const getGlobal = (attr) => {
	return window.attr
}

