import React , { useState } from 'react'
import '../index.css'
import { Input} from './formInput'
import { Label} from './formLabel'
import { InputButton } from './footerButton'
import { InputCheckbox } from './checkbox'

export const TaskList= (props) => {

    const {  tasks , callEditor , setCompleted , completed , setTask , setTotalTasks , viewMode} = props
    const [ display , setDisplay] = useState('none')
    // const [selectedStyle , setSelectedStyle] = useState(true)

    // const [isChecked , setIsChecked ] = useState(false)

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
                    // setTask([...tasks , {status : true}])
                    return { ...data, status: true}
                }
                else return data
            })
            // setSelectedStyle(true)
        }
        else {
          
            const newSelected = completed.filter((data) => data !== value)
            setCompleted(newSelected)

            newTasks = tasks.map((data) => {
                if (data.id === value) {
                    // setTask([...tasks, { status: false }])
                    return { ...data, status: false }
                }
                else return data

            })
            // setSelectedStyle(false)
        }

        // const remainingTasks = tasks.filter((data) => !completed.includes(data.id))
        // setTask(remainingTasks)
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

    // const completedTasks = tasks.filter((data) => completed.includes(data.id))
    // const pendingTasks = tasks.filter((data) => !completed.includes(data.id))

    // const arrayToMap = viewMode === 'all' ? tasks : pendingTasks
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
                     {/* <InputCheckbox Style="checkboxStyle" whenClicked={} />  */}
                    <input type="checkbox" onClick={() => manageCompleted(data.id)} checked={data.status} className="checkboxStyle" />
                    <Label key={data.id} value={data.name} whenClicked={() => callEditor(data.id)} Style={data.status ? 'completedTask' : ''}/> 
                    <InputButton value="X" onOff={display} Style="delete" whenClicked={() => deleteSingleTask(data.id)} /> 
                </div> 
                )
    })

    return( <li> {lists} </li>  )

}

