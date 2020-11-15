import { Label , InputButton , InputCheckbox } from './myComponents'
import React , { useState } from 'react'
import '../index.css'

export const TaskList= (props) => {

    const {  tasks , callEditor , setCompleted , completed , setTask , setTotalTasks , viewMode} = props
    const [ display , setDisplay] = useState('none')

    const show = () => {
        setDisplay('block')
    }

    const manageCompleted = (value) => {

        const isAdded = completed.filter((data) => completed.includes(value))
        let newTasks

        if (isAdded.length === 0) {
            
            setCompleted([...completed, value])
            newTasks = tasks.map((data) => {
                if(data.id === value){
                    return { ...data, status: true}
                }
                else return data
            })
        }
        else {
          
            const newSelected = completed.filter((data) => data !== value)
            setCompleted(newSelected)

            newTasks = tasks.map((data) => {
                if (data.id === value) {
                    return { ...data, status: false }
                }
                else return data

            })
        }
        setTask(newTasks)
    }

    const deleteSingleTask = (value) => {
        const remainingTasks = tasks.filter((data) => data.id !== value)
        setTask(remainingTasks)

        const remainingCompleted = completed.filter((data) => data !== value)
        setCompleted(remainingCompleted)

    }

    const hide = () => {
        setDisplay('none')
}

    let arrayToMap 
    if(viewMode === 'all'){
        arrayToMap = tasks.filter((data) => { return data} )
    }
    else if(viewMode === 'completed'){
        arrayToMap = tasks.filter((data) => completed.includes(data.id))
    }
    else if(viewMode === 'pending'){
        arrayToMap = tasks.filter((data) => !completed.includes(data.id))
    }
 
        setTotalTasks(arrayToMap.length)

    const lists = arrayToMap.map((data) => {

        return (
                <div className="listDiv" onMouseLeave={hide} onMouseEnter={show}>
                    <InputCheckbox whenClicked={() => manageCompleted(data.id)} checkedStatus={data.status} Style="checkboxStyle" />
                    <Label key={data.id} value={data.name} whenClicked={() => callEditor(data.id)} Style={data.status ? 'completedTask' : ''}/> 
                    <InputButton value="X" onOff={display} Style="delete" whenClicked={() => deleteSingleTask(data.id)} /> 
                </div> 
                )
    })

    return( <li> {lists} </li>  )

}

