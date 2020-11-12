import React, { useState } from 'react'
import { Heading } from './components/heading'
import { Input } from './components/formInput'
import { TaskList } from './components/taskList'
import { Footer } from './components/footer'
import { Label } from './components/formLabel'
import './index.css'

var Id = 0

    export const App = () => {
        const initialTasks = [
                { id : 0 , name : 'jjjjj'} 
        ]

        const [tasks , setTask] = useState([])
        const [activeTask , setActiveTask] = useState({ id : 0 , name : ''})
        const [editingMode , setEditingMode] = useState(false)
        const [completed, setCompleted] = useState([])
        const [viewMode, setViewMode] = useState('all')
        const [typingMode , setTypingMode] = useState(true)
        const [totalTasks , setTotalTasks] = useState('')



       const handleChange = (value) => {
            setActiveTask({...activeTask , name : value})

        }

              const deleteMultiple = () =>{
            const remainingTasks = tasks.filter((data) => !completed.includes(data.id))
            setCompleted([])
            setTask(remainingTasks)

        }
        
        const addTask = (key) => {

            if(key === 'Enter' && !editingMode){
                Id += 1

                setTask([...tasks , {...activeTask , id : Id}])
                // console.log(Id)
                setActiveTask({ id : '' , name : ''})
                setTypingMode(true)

            }
            else  if(key === 'Enter' && editingMode){
                const newTaskList = tasks.map((data) => {
                    if(data.id === activeTask.id){
                    return {...data , name : activeTask.name}  
                            }
                    else return data
                })
               
        
                // console.log(newTaskList.length)
                setTask(newTaskList)
                setEditingMode(false)
                setActiveTask({ id: '', name: '' })
                setTypingMode(true)

            }
            else if (key !== 'Enter') {
                setTypingMode(false)

            }
            else {

            }
 
        }

        const callEditor = (value) => {
            const taskToEdit = tasks.find((data) => data.id === value)
            setActiveTask(taskToEdit)
            setEditingMode(true)
            // console.log(taskToEdit)
        }

        let message
        if (viewMode === 'all' && !totalTasks ) {
            message = 'Not Any Task Yet'
        }
        else if (viewMode === 'all') {
            message = 'Total Tasks => ' + totalTasks
        }
        else if (viewMode === 'completed' && !totalTasks){
            message = 'No Completed Tasks Yet'
        }
        else if (viewMode === 'completed') {
            message = 'Completed Tasks => ' + totalTasks
        }
        else if (viewMode === 'pending' && !totalTasks){
            message = 'No Pending Tasks'
        }
        else if (viewMode === 'pending') {
            message = 'Pending Tasks => ' + totalTasks
        }

        return (
            <div className="container">
                <Heading title="Todo List"  typingMode={typingMode}/>
                {/* <label className="typingMode" >  </label> */}
                <Label Style="typingMode" typingMode={typingMode}  value="Typing..." />
                
                <Input type="text" value={activeTask.name} placeholder="Type A Task" Style="inputStyle" whenChanged={handleChange} whenKeyIsDown={addTask}/>
                <br />  <br />
                {/* <label  className="typingMode2">{message}</label> */}
                <Label Style="typingMode2" value={message} />

                <ul>  <TaskList setTotalTasks={setTotalTasks} viewMode={viewMode} tasks={tasks} callEditor={callEditor} setTask={setTask} completed={completed} setCompleted={setCompleted} />  </ul>

                <Footer completed={completed} deleteMultiple={deleteMultiple} tasks={tasks.length} viewMode={viewMode} setViewMode={setViewMode} setCompleted={setCompleted} />

            </div>
        )
}


