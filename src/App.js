import {useMemo, useState, useEffect} from "react"
import styled from 'styled-components';
import Text from './Components/Input/Index';
import Task from "./Components/Task/Index";
import { v4 as uuidv4 } from 'uuid';
uuidv4();


const Container = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
  width: auto;
  padding-top: 1rem;  
  font-family: "roboto";
`

const Title = styled.h1`
  padding-bottom: .5rem;
  color: white;
`

const Top = styled.div`
  padding: 2rem;
  background-color: #9f75ff;
  border-radius: 5px 5px 0 0px;

 
`

const TaskCotainer = styled.div`
  min-height: 0%;
  max-height: 500px;
  width: 100%;
  color: black;
`


function App() {

  
  const [tasks, setTasks] = useState([]);

  const options = [
    {value: "High", label: "High"},
    {value: "Medium", label: "Medium"},
    {value: "Low", label: "Low"},
]
  
  useEffect(() => {
    const storedTasks = JSON.parse(window.localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const createTask = (todo, priority) =>
  {
    const newTask = {id: uuidv4(), task: todo, completed: false, priority: priority}
    setTasks([...tasks, newTask]);
    
    window.localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]))
  }

  const sortedTasks = useMemo(() => {
    const highPriorityTasks = tasks.filter(task => task.priority === "High" && task.completed === false);
    const mediumPriorityTasks = tasks.filter(task => task.priority === "Medium" && task.completed === false);
    const lowPriorityTasks = tasks.filter(task => task.priority === "Low" && task.completed === false);
    
    const highPriorityTasksCompleted = tasks.filter(task => task.priority === "High" && task.completed === true);
    const mediumPriorityTasksCompleted = tasks.filter(task => task.priority === "Medium" && task.completed === true);
    const lowPriorityTasksCompleted = tasks.filter(task => task.priority === "Low" && task.completed === true);

    return [...highPriorityTasks, ...mediumPriorityTasks, ...lowPriorityTasks, ...highPriorityTasksCompleted, ...mediumPriorityTasksCompleted, ...lowPriorityTasksCompleted];
  }, [tasks]);

  const handleComplete = (id) => {
    const updatedTasks = tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task);
    setTasks(updatedTasks);
    window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  

  const handleDelete = (id) =>
  {
    setTasks(tasks.filter(task => task.id !== id))
    window.localStorage.setItem("tasks", JSON.stringify([...tasks.filter(task => task.id !== id)]));
  }


  return (
    <Container>
      <Title>Todo List</Title>
      <Top>
        <Text createTask={createTask} options={options}/>
      </Top>
      <TaskCotainer>
      {sortedTasks.map((task, i) => (
                    <Task 
                      key={i} 
                      id={task.id }
                      completed={task.completed} 
                      task={task.task} 
                      priority={task.priority} 
                      handleComplete={handleComplete} 
                      handleDelete={handleDelete}
                    >
            </Task>
            ))}
      </TaskCotainer>
      
    </Container>
  );
}

export default App;
