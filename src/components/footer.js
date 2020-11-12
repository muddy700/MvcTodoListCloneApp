import React , { useState } from 'react'
import '../index.css'
import { Label } from './formLabel'
import { InputButton} from './footerButton'


export const Footer = (props) =>{
    const { completed , deleteMultiple , tasks , viewMode , setViewMode} = props
    console.log('reached ' + completed.length)
    const message = tasks === 1 ? ' Task Pending' : ' Tasks Pending'
    const message2 = completed.length === 1 ? ' Task Completed' : ' Tasks Completed'

    // const changeViewMode = (value) => {
    //     setViewMode(value)
    // }

    return(
        <div className="footerDiv">
            <label > {tasks - completed.length > 0 ? tasks-completed.length + message : ''} </label>
            <InputButton value="All" whenClicked={() => setViewMode('all')} />
            <InputButton value="Pending" whenClicked={() => setViewMode('pending')}/>
            <InputButton value="Complited" whenClicked={() => setViewMode('completed')} />
            <InputButton value="Clear Complited" whenClicked={deleteMultiple} completed={completed.length} />  &nbsp;  &nbsp;
            <label > {completed.length > 0 ? completed.length + message2 : ''} </label>

            {/* <input type="button" className="footerButton" value="All" />
            <input type="button" className="footerButton" value="Active" />
            <input type="button" className="footerButton" value="Complited" />
            <input type="button" className="footerButton" value="Clear Complited" /> */}

        </div>
    )
}
