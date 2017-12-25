# ODEUM Form TODO

- [ ] Md5 encrypt password 
- [ ] Checkbox
- [ ] Radio 
- [x] Fix innerRef <!--or resolve with querySelectorAll + Fix focusField(name) -->
- [x] Fix innerRef creation by taking input.name (which should be in all cases unique) rather than the Component name.
- [x] Fix innerRef for Select fields
- [x] Select Field (selectField(name))  now named nextInput(arg)
	- [x] this.nextInput(field) -> sets focus on field
	- [x] this.nextInput() -> sets focus on the next field relative to the last focused field
- [x] Fix nextInput (readOnly skip field on ENTER)
- [ ] Fix nextInput (doesn't update inputFocus counter when using TAB - that's why handleFocus might be useful again thus it catches that event)
- [x] Value update based upon other input value (through state change) - partially tested


- [x] allowKeys={ {'esc': true, 'enter': true} } Form prop for allowing ESC + ENTER in onKeydown
- [ ] CopyToClipboard (Form prop)
		<!-- why would a user need to copy to clipboard the form values? 
		To remember something you enter into a form and save it elsewhere-->
- [x] Validation (add following)
	- [x] Select has now build in validation (required)

- [x] If there is no focusField prop, jump to first one.
- [x] Modify handleFocus to set inputFocus for the same reason as focusField. ( [Case 1](#case-1) )
- [x] Find the position of the focusField and set inputFocus correctly. ( [Case 1](#case-1) )

- [ ] Fix validation on readOnly fields ( [Case 2](#case-2))
		<!-- why do we need validation on an input that basically can't be edited ? 
		If dev/user passes validation to a readonly field -->
- [x] Move stuff from CDM to Constructor 
	- Reduced rerenders from 6-12 to 3 
		- the last 3 I think they are related to OA and Form nextInput()
		- Reversed Order of setState re-renders: 
			- Setting the focusfield
			- Setting 2nd Tab Active in Tab List 
			- Setting the 2nd Menu Item Active in Menu Panel
 
- [ ] Reorganize regions with specific functions
# Cases: 
## Case 1: 
### Pressing 'ENTER' jump to next input 

1. User sets _**focusField**_ 3rd field in a form
2. User presses _**Enter**_

-  **Result:** Focus jumps on first field
- **Expected Result:** Focus jumps on 4th field



## Case 2:
### Input Field readOnly validation

1. Dev passes a validation prop to readOnly field which makes any value invalid (or some valid some not )*
	* Example: inputField that has the name with small caps taken from the server and placed inside a readOnly input with a validator that requires first letter UPPERCASE.
2. User completes the form with all the details correctly except for the uneditable readOnly input.
3. User submits Form.

- **Result:** Form is invalid and impossible to submit due to an uneditable invalid input.
- **Expected Result:** User is able to either edit the invalid input(which is technically impossible) or submit the form with the invalid readOnly (depending on the readOnly input _See example at step 1_) .

