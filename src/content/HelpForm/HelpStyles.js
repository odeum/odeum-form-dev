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

    /* &:hover {
        box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
		cursor: ${(props) => props.isDisabled ? 'not-allowed' : 'pointer'};
    } */

    &:hover {		
        border-color: ${transparentize(0.7, '#3B97D3')};		 
		box-shadow: ${`0 0 0 3px ${transparentize(0.7, '#3B97D3')}`};
		cursor: ${(props) => props.isDisabled ? 'not-allowed' : 'pointer'};
    }

    &:focus {
		box-shadow: ${(props) => props.focusColor ? `0 0 0 3px ` + props.focusColor : `0 0 0 3px #13A085`};
    }
`

export const Account = Input.extend`
	height: 9%; 
	width: 100%;
	margin-top: 40px;
	color: ${(props) => props.color ? props.color : '#13A085'};
`

export const HelpTitle = Input.extend`
	height: 10%; 
	width: 100%;
	margin-top: 15px; 
	color: ${(props) => props.color ? props.color : '#13A085'};
`

/* Andrei's Styles */

export const InputGreen = Input.extend`
height: 9%; 
width: 100%;
margin-top: 40px;
color: ${(props) => props.color ? props.color : '#13A085'};
`
export const DoublePanel = styled.div`
display:grid;
grid-template-rows: auto auto;
grid-template-columns: auto auto;
`
export const Panel = styled.div`
margin: 5px;
padding:3px;
border-radius: 5px;
border: 1px solid #e1e1e1;
`
/* End Andrei's Styles */