import { Heading , Label , Input} from './components/myComponents'
import { TaskList } from './components/taskList'
import { Footer } from './components/footer'
import React, { useState } from 'react'
import './index.css'

var Id = 0

    export const App = () => {

        // const initialTasks = [
        //         { id : 0 , name : 'jjjjj'} 
        // ]

        const [tasks , setTask] = useState([])
        const [activeTask , setActiveTask] = useState({ id : 0 , name : ''})
        const [editingMode , setEditingMode] = useState(false)
        const [completed, setCompleted] = useState([])
        const [viewMode, setViewMode] = useState('all')
        const [typingMode , setTypingMode] = useState(true)
        const [totalTasks , setTotalTasks] = useState('')
        const [errorMessage , setErrorMessage] = useState('')
        const [errorMode , setErrorMode] = useState(false)
        const [permissionToAdd , setPermissionToAdd ] = useState(false)
        // const [allSelected , setAllSelected] = useState(false)

        const handleChange = (value) => {
            setActiveTask({...activeTask , name : value})            
            }

        const deleteMultiple = () =>{
            const remainingTasks = tasks.filter((data) => !completed.includes(data.id))
            setCompleted([])
            setTask(remainingTasks)

        }

        const validator = (key) => {
            if (activeTask.name.length <= 0 && key !== 'Enter') {
                setErrorMessage('Task Name Required')
                setErrorMode(true)
                setTypingMode(false)
                setPermissionToAdd(false)
            } else if (activeTask.name.length < 4 && key !== 'Enter') {
                setErrorMessage('Enter Atleast 4 Characters')
                setPermissionToAdd(false)
                setErrorMode(true)
            }
            else if (activeTask.name.length >= 4) {
                setErrorMessage('')
                setPermissionToAdd(true)
                setErrorMode(false)

            }

        }

        const addTask = (key) => {
           if (activeTask.name.length <= 0) {
               setErrorMessage('Task Name Required')
               setErrorMode(true)
               setTypingMode(false)
            //    setPermissionToAdd(false)
           }
            else  if(key === 'Enter' && !editingMode && permissionToAdd ){
                Id += 1

                setTask([...tasks , {...activeTask , id : Id , status : false}])
                // console.log(Id)
                setActiveTask({ id : '' , name : ''})
                setTypingMode(true)
                setErrorMode(false)
                setErrorMessage('')
                setPermissionToAdd(false)

            }
            else  if(key === 'Enter' && editingMode && permissionToAdd){
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
                setPermissionToAdd(false)

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
        }

        let message
        if (viewMode === 'all' && !totalTasks ) {
            message = 'No Any Task Yet'
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
                <Heading title="Todo List" Style="title" />
                <Label Style="typingMode" hiddingMode={typingMode}  value="Typing..." />
                <Input type="text" keyIsUp={validator} value={activeTask.name} placeholder="Type A Task" Style="inputStyle" whenChanged={handleChange} whenKeyIsDown={addTask} />
                <Label Style="errorMode" hiddingMode={!errorMode} value={errorMessage} />
                <br /> 
                <Label Style="typingMode2" value={message} />
                <ul> 
                 <TaskList setTotalTasks={setTotalTasks} viewMode={viewMode} tasks={tasks} callEditor={callEditor} setTask={setTask} completed={completed} setCompleted={setCompleted} /> 
                </ul>
                <Footer completed={completed} deleteMultiple={deleteMultiple} tasks={tasks.length} viewMode={viewMode} setViewMode={setViewMode} setCompleted={setCompleted} />
            </div>
        )
}


