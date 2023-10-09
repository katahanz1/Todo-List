import styled from "styled-components";
import { useState } from "react";

const Container = styled.form`
    display: flex;
    gap: 1.75rem;
`

const Input = styled.input`
    width: 500px;
    height: 60px;
    background-color: #fff;
    border: none;
    outline: none;
    border-radius: 7px;
    font-weight: 400;
    font-size: medium ;
`
const Button = styled.button`
    width: 100px;
    border: none;
    border-radius: 7px;
    background-color: lightblue;
    font-size: medium;
    cursor: pointer;
    

    &:active {
        background-color: gray;
    }
`

const Select = styled.select`
    border: none;
    outline: none;
    font-size: 16px;
    height: 60px;
    padding: 6px;
    border-radius: 7px;
    
`


const Text = ({createTask, options}) => {

    const [text, setText] = useState("");
    const [option, setOption] = useState("")

    

    const handleChange = (e) =>{
    
        setText(e.target.value);
    }

    const handleSelection = (e) =>
    {
        setOption(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createTask(text,option)
        setText("");
        setOption("");
        
    }

    return(
        <Container onSubmit={handleSubmit}>
            <Input required  value={text} onChange={handleChange} placeholder="Make dinner..."></Input>
            <Select required={true} value={option} onChange={handleSelection} >
                <option value="" disabled>Seleccione grado de urgencia</option>
                {options.map((opcion, i) => (
                    <option key={i} value={opcion.value}>
                {opcion.label}
            </option>
            ))}
          
        </Select>
            <Button >Submit</Button>
        </Container>
    )
}

export default Text
