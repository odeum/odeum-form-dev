# ODEUM Form TODO

- [x] Fix innerRef <!--or resolve with querySelectorAll + Fix focusField(name) -->
- [x] Fix innerRef creation by taking input.name(which should be in all cases unique) rather than the Component name
- [x] Select Field (selectField(name))  now named nextInput(arg)
	- [x] this.nextInput(field) -> sets focus on field
	- [ ] this.nextInput() -> sets focus on the next field relative to the last focused focused field -- partial done - in relation to handleFocus function
- [x] Fix nextInput (readOnly/disabled and other cases to skip field on ENTER)
- [ ] Fix handleResetInput to work with arg for passed field or all (default)
		<!-- Need more details on this 
		Press ESC and reset only the current field?-->
- [ ] Value update based upon other input value (through state change)
		<!-- Need more details on this -->
- [ ] Buttons + style
- [ ] CopyToClipboard (Form prop)
		<!-- why would an User need to copy to clipboard the form values? -->
- [ ] Validation (add following)
	- [ ] isCountry

- [x] If there is no focusField prop, jump to first one.
- [ ] Modify handleFocus to set inputFocus for the same reason as focusField. ( [Case 1](#Case-1) )
- [x] Find the position of the focusField and set inputFocus correctly. ( [Case 1](#Case-1) )

- [x] ? Fix validation on readOnly fields
		<!-- why do we need validation on an input that basically can't be edited ? -->
- [x] Move stuff from CDM to Constructor 
	- Reduced rerenders from 6-12 to 3 
		- the last 3 I think they are related to OA and Form nextInput()
		- Reversed Order of setState re-renders: 
			- Setting the focusfield
			- Setting 2nd Tab Active in Tab List 
			- Setting the 2nd Menu Item Active in Menu Panel
 

# Cases: 
## Case 1: 

1. User sets _**focusField**_ 3rd field in a form
2. User presses _**Enter**_

-  **Result:** Focus jumps on first field
- **Expected Result:** Focus jumps on 4th field




