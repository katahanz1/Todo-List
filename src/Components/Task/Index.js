import styled from "styled-components"
import { AiFillDelete, AiFillCheckSquare } from "react-icons/ai";
import {BsCheckSquare} from "react-icons/bs"

const ActiveTask = styled.div`
    background-color: red;
    width: auto;
    font-size: large;
    padding: 2rem 3rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
`
const Functionalities = styled.div`
    display: flex;
    gap: 1.25rem;
`

const Task = ({id, completed, task, priority, handleComplete, handleDelete}) =>
{
    return <ActiveTask >
        {task}
        <Functionalities>
            {priority}
            {completed ? <AiFillCheckSquare onClick={() => handleComplete(id)}/> : <BsCheckSquare onClick={() => handleComplete(id)} /> }
            <AiFillDelete onClick={() => handleDelete(id)}/>
        </Functionalities>
    </ActiveTask>
}

export default Task