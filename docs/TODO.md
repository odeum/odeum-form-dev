# ODEUM Form TODO

- [x] Fix innerRef <!--or resolve with querySelectorAll + Fix focusField(name) -->
- [x] Select Field (selectField(name))
- [x] Fix nextInput (readOnly/disabled and other cases to skip field on ENTER)
- [ ] Fix handleResetInput to work with arg for which field / all
- [ ] Value update based upon other input value (through state change)
		<!-- Need more details on this -->
- [ ] Buttons + style
- [ ] CopyToClipboard (Form prop)

- [ ] Validation (add following)
	- [ ] isCountry

- [x] If there is no focusField prop, jump to first one.
- [ ] Modify handleFocus to set inputFocus for the same reason as focusField. ( [Case 1](#Case-1) )
- [ ] Find the position of the focusField and set inputFocus correctly. ( [Case 1](#Case-1) )

	
	
	
# Cases: 
## Case 1: 
1. User sets focusField 3rd field in a form
2. User presses Enter
* Result: Focus jumps on first field
* Expected Result: Focus jumps on next field
			