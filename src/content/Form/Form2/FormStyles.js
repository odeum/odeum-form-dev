import styled from 'styled-components'
import { transparentize } from 'polished'

export const Input = styled.input`    
	font-size: 16px;
	font-weight: 200;
    padding: 1rem;
    color: ${p => p.color ? p.color : '#2C3E50'};
    background: #ECF0F1;
    border: none;
	border-radius: 4px;
    box-sizing: border-box;
	outline: none;

    &:hover {		
        border-color: ${transparentize(0.7, '#3B97D3')};		 
		box-shadow: ${`0 0 0 3px ${transparentize(0.7, '#3B97D3')}`};
		cursor: ${p => p.isDisabled ? 'not-allowed' : p.disabled ? 'not-allowed' : p.readOnly ? 'not-allowed' : 'pointer'};
		background-color: #E3E5E5;
    }

    &:focus {
		box-shadow: ${p => p.focusColor ? `0 0 0 3px ` + p.focusColor : `0 0 0 3px #13A085`};
    }
`

export const StyledInput = Input.extend`
	height: ${p => p.height ? p.height : '10%'};
	width: ${p => p.width ? p.width : '100%'};
	margin-bottom: 15px;
	color: ${p => p.color ? p.color : '#13A085'};
`

export const Select = styled.select`    
	font-size: 16px;
	font-weight: 200;
    padding: 1rem;
    color: ${p => p.color ? p.color : '#2C3E50'};
    background: #ECF0F1;
    border: none;
	border-radius: 4px;
    box-sizing: border-box;
	outline: none;

    &:hover {		
        border-color: ${transparentize(0.7, '#3B97D3')};		 
		box-shadow: ${`0 0 0 3px ${transparentize(0.7, '#3B97D3')}`};
		cursor: ${p => p.isDisabled ? 'not-allowed' : p.disabled ? 'not-allowed' : p.readOnly ? 'not-allowed' : 'pointer'};
		background-color: #E3E5E5;
    }

    &:focus {
		box-shadow: ${p => p.focusColor ? `0 0 0 3px ` + p.focusColor : `0 0 0 3px #13A085`};
    }
`

export const StyledSelect = Select.extend`
	height: ${p => p.height ? p.height : '40px'};
	width: ${p => p.width ? p.width : '100%'};
	margin-bottom: 15px;
	color: ${p => p.color ? p.color : '#13A085'};
`

export const TextArea = styled.textarea`    
	font-size: 16px;
	font-weight: 200;
    padding: 1rem;
    color: ${p => p.color ? p.color : '#2C3E50'};
    background: #ECF0F1;
    border: none;
	border-radius: 4px;
    box-sizing: border-box;
	outline: none;	

    &:hover {		
        border-color: ${transparentize(0.7, '#3B97D3')};		 
		box-shadow: ${`0 0 0 3px ${transparentize(0.7, '#3B97D3')}`};
		cursor: ${p => p.isDisabled ? 'not-allowed' : p.disabled ? 'not-allowed' : p.readOnly ? 'not-allowed' : 'pointer'};
		background-color: #E3E5E5;
    }

    &:focus {
		box-shadow: ${p => p.focusColor ? `0 0 0 3px ` + p.focusColor : `0 0 0 3px #13A085`};
    }
`

export const StyledTextArea = TextArea.extend`
	height: ${p => p.height ? p.height : '80px'};
	width: ${p => p.width ? p.width : '100%'};
	resize: ${p => p.resize ? null : 'none'};
	margin-bottom: 15px;
	color: ${p => p.color ? p.color : '#13A085'};
`
