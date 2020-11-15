import React  from 'react'
import '../index.css'
import { InputButton, Label} from './myComponents'

export const Footer = (props) =>{

    const { completed , deleteMultiple , tasks , setViewMode} = props
    // console.log('reached ' + completed.length)
    const message1 = tasks - completed.length === 1 ? ' Task Pending' : ' Tasks Pending'
    const message2 = completed.length === 1 ? ' Task Completed' : ' Tasks Completed'
    const pendingSize = tasks - completed.length > 0 ? tasks - completed.length + message1 : ''
    const completedSize = completed.length > 0 ? completed.length + message2 : ''

    return(
        <div className="footerDiv">
            <Label value={pendingSize} Style="labelStyle"/>
            <InputButton value="All" whenClicked={() => setViewMode('all')} />
            <InputButton value="Pending" whenClicked={() => setViewMode('pending')}/>
            <InputButton value="Complited" whenClicked={() => setViewMode('completed')} />
            <InputButton value="Clear Complited" whenClicked={deleteMultiple} completed={completed.length} />  &nbsp;  &nbsp;
            <Label value={completedSize} Style="labelStyle" />
        </div>
    )
}
