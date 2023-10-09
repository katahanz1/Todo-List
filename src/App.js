import {useMemo, useState} from "react"
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
  left: 325px;
  padding-top: 3.3rem;

`
const Top = styled.div`
  display: flex;
  padding: 3rem;
  background-color: #A99A9F;
  border-radius: 5px 5px 0 0px;
  
`

const TaskCotainer = styled.div`
  min-height: 0%;
  max-height: 500px;
  width: 100%;
  
  
`


function App() {

  
  const [tasks, setTasks] = useState([]);

  const options = [
    {value: "High", label: "High"},
    {value: "Medium", label: "Medium"},
    {value: "Low", label: "Low"},
]
  

  const createTask = (todo, priority) =>
  {
    setTasks([...tasks, {id: uuidv4(), task: todo, completed: false, priority: priority}]);
  
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

  const handleComplete = (id) =>
  {
    setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task))
  }

  const handleDelete = (id) =>
  {
    setTasks(tasks.filter(task => task.id !== id))
    console.log("eliminando")
  }


  return (
    <Container>
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
