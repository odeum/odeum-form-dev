// console.API

const clearConsole = () => {
	if (typeof console._commandLineAPI !== 'undefined') {
		console.API = console._commandLineAPI //chrome
	} else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
		console.API = console._inspectorCommandLineAPI //Safari
	} else if (typeof console.clear !== 'undefined') {
		console.API = console
	}
	console.API.clear()
}

export default clearConsole

