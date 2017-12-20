import styled from 'styled-components'
import { transparentize } from 'polished'

export const Input = styled.input`    
	font-size: 16px;
	font-weight: 200;
    padding: 1rem;
    color: ${(props) => props.color ? props.color : '#2C3E50'};
    background: #ECF0F1;
    border: none;
	border-radius: 4px;
    box-sizing: border-box;
	outline: none;

    &:hover {		
        border-color: ${transparentize(0.7, '#3B97D3')};		 
		box-shadow: ${`0 0 0 3px ${transparentize(0.7, '#3B97D3')}`};
		cursor: ${(props) => props.isDisabled ? 'not-allowed' : 'pointer'};
    }

    &:focus {
		box-shadow: ${(props) => props.focusColor ? `0 0 0 3px ` + props.focusColor : `0 0 0 3px #13A085`};
    }
`

export const StyledInput = Input.extend`
	height: 10%; 
	width: 100%;
	margin-bottom: 15px;
	color: ${(props) => props.color ? props.color : '#13A085'};
`

export const Select = styled.select`    
	font-size: 16px;
	font-weight: 200;
    padding: 1rem;
    color: ${(props) => props.color ? props.color : '#2C3E50'};
    background: #ECF0F1;
    border: none;
	border-radius: 4px;
    box-sizing: border-box;
	outline: none;

    &:hover {		
        border-color: ${transparentize(0.7, '#3B97D3')};		 
		box-shadow: ${`0 0 0 3px ${transparentize(0.7, '#3B97D3')}`};
		cursor: ${(props) => props.isDisabled ? 'not-allowed' : 'pointer'};
    }

    &:focus {
		box-shadow: ${(props) => props.focusColor ? `0 0 0 3px ` + props.focusColor : `0 0 0 3px #13A085`};
    }
`

export const StyledSelect = Select.extend`
	height: 40px; 
	width: 100%;
	margin-bottom: 15px;
	color: ${(props) => props.color ? props.color : '#13A085'};
`

export const TextArea = styled.textarea`    
	font-size: 16px;
	font-weight: 200;
    padding: 1rem;
    color: ${(props) => props.color ? props.color : '#2C3E50'};
    background: #ECF0F1;
    border: none;
	border-radius: 4px;
    box-sizing: border-box;
	outline: none;

    &:hover {		
        border-color: ${transparentize(0.7, '#3B97D3')};		 
		box-shadow: ${`0 0 0 3px ${transparentize(0.7, '#3B97D3')}`};
		cursor: ${(props) => props.isDisabled ? 'not-allowed' : 'pointer'};
    }

    &:focus {
		box-shadow: ${(props) => props.focusColor ? `0 0 0 3px ` + props.focusColor : `0 0 0 3px #13A085`};
    }
`

export const StyledTextArea = TextArea.extend`
	height: 80px; 
	width: 100%;
	margin-bottom: 15px;
	color: ${(props) => props.color ? props.color : '#13A085'};
`
