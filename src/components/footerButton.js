import React from 'react'
import '../index.css'

export const InputButton = ({ whenClicked , Style , completed , hide , show , onOff , value }) => {
    return (
        // <div className="inputDiv">
        <input 
        type="button" 
        value={value} 
        onClick={whenClicked} 
        style={{display : onOff}} 
        hidden={completed <= 0 ? true : false}
        className={Style ? "deleteButton" : "footerButton" } />
        // </div>
    )
}