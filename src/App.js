import React, { useState } from 'react'
import { Heading } from './components/heading'
import { Input } from './components/formInput'
import { TaskList } from './components/taskList'
import { Footer } from './components/footer'
import { Label } from './components/formLabel'
import { InputButton } from './components/footerButton'
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
        const [errorMessage , setErrorMessage] = useState('')
        const [errorMode , setErrorMode] = useState(false)
        const [allSelected , setAllSelected] = useState(false)



       const handleChange = (value) => {
            setActiveTask({...activeTask , name : value})            
        }

              const deleteMultiple = () =>{
            const remainingTasks = tasks.filter((data) => !completed.includes(data.id))
            setCompleted([])
            setTask(remainingTasks)

        }

        const addTask = (key) => {

            if (activeTask.name.length <= 0) {
                setErrorMessage('Task Name Required')
                setErrorMode(true)
                setTypingMode(false)
            }
            else if (activeTask.name.length < 4) {
                setErrorMessage('Enter Atleast 5 Characters')
                setErrorMode(true)
            }
            else if (key !== 'Enter' ) {
                setErrorMessage('')
                setErrorMode(false)
            }
            else if(key === 'Enter' && !editingMode){
                Id += 1

                setTask([...tasks , {...activeTask , id : Id , status : false}])
                // console.log(Id)
                setActiveTask({ id : '' , name : ''})
                setTypingMode(true)
                setErrorMode(false)
                setErrorMessage('')

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

        const selectAll = () => {
            let newTasks
            if(allSelected){
                setAllSelected(false)
                 newTasks = tasks.map((data) => {
                    // setTask([...tasks , {status : true}])
                    return { ...data, status: false }
                }) 
                setCompleted([])     
            }
            else {
            setAllSelected(true)
           newTasks = tasks.map((data) => {
                    // setTask([...tasks , {status : true}])
            //    setCompleted([...completed, data.id])
                    return { ...data, status: true }
                })
                setCompleted(tasks.map((data) => data.status ?  data.id : '' ))
            }
            setTask(newTasks)
        }
        const callEditor = (value) => {
            const taskToEdit = tasks.find((data) => data.id === value)
            setActiveTask(taskToEdit)
            setEditingMode(true)
            // console.log(taskToEdit)
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
                <Heading title="Todo List"  typingMode={typingMode}/>
                {/* <label className="typingMode" >  </label> */}
                <Label Style="typingMode" hiddingMode={typingMode}  value="Typing..." />
                
                <Input type="text" value={activeTask.name} placeholder="Type A Task" Style="inputStyle" whenChanged={handleChange} whenKeyIsDown={addTask}/>
                <Label Style="errorMode" hiddingMode={!errorMode} value={errorMessage} />
                <br /> 
               <Label Style="typingMode2" value={message} />
               {/* <InputButton /> */}
                {/* <input type="button"  value={allSelected ? 'Dis-Select All' : 'Select All'} disabled={tasks.length <=0} onClick={selectAll} /> */}
                <ul>  <TaskList setTotalTasks={setTotalTasks} viewMode={viewMode} tasks={tasks} callEditor={callEditor} setTask={setTask} completed={completed} setCompleted={setCompleted} />  </ul>

                <Footer completed={completed} deleteMultiple={deleteMultiple} tasks={tasks.length} viewMode={viewMode} setViewMode={setViewMode} setCompleted={setCompleted} />

            </div>
        )
}


