import React , { useState } from 'react'
import '../index.css'
import { Input} from './formInput'
import { Label} from './formLabel'
import { InputButton } from './footerButton'
import { InputCheckbox } from './checkbox'

export const TaskList= (props) => {

    const {  tasks , callEditor , setCompleted , completed , setTask , setTotalTasks , viewMode} = props
    const [ display , setDisplay] = useState('none')

    // const [isChecked , setIsChecked ] = useState(false)

    const show = () => {
        setDisplay('block')
    }

    const manageCompleted = (value) => {

        const isAdded = completed.filter((data) => completed.includes(value))

        if (isAdded.length === 0) {
            
            setCompleted([...completed, value])
        }
        else {
          
            const newSelected = completed.filter((data) => data !== value)
            setCompleted(newSelected)
        }

        // const remainingTasks = tasks.filter((data) => !completed.includes(data.id))
        // setTask(remainingTasks)
      
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
                    <input type="checkbox" onClick={() => manageCompleted(data.id)} className="checkboxStyle" />
                    <Label key={data.id} value={data.name} whenClicked={() => callEditor(data.id)} /> 
                    <InputButton value="X" onOff={display} Style="delete" whenClicked={() => deleteSingleTask(data.id)} /> 
                </div> 
                )
    })

    return( <li> {lists} </li>  )

}

