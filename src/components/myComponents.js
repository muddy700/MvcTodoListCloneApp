import React from 'react'
import '../index.css'

export const Heading = ({title , Style}) => {

    return (
         <h1 className={Style}>{title}</h1>
    )
}

export const Label = ({ value , whenClicked , Style , hiddingMode}) => {
    return (
        <div className="divLable">
            <label className={Style ? Style : "lableStyle"} onClick={whenClicked} hidden={hiddingMode} > {value}</label>
        </div>
    )
}

export const InputCheckbox = ({ Style, whenClicked , checkedStatus }) => {
    return (
        <input type="checkbox" checked={checkedStatus} onClick={whenClicked} className={Style} />
    )
}

export const InputButton = ({ whenClicked , Style , completed , hide , show , onOff , value }) => {
    return (
        <input 
        type="button" 
        value={value} 
        onClick={whenClicked} 
        style={{display : onOff}} 
        hidden={completed <= 0 ? true : false}
        className={Style ? "deleteButton" : "footerButton" } />
    )
}

export const Input = ({type , placeholder , Style , keyIsUp , whenChanged , checkedStatus , whenKeyIsDown , value}) => {
    return(
            <input type ={type} value={value} placeholder={placeholder} checked={checkedStatus} onKeyUp={(e) => keyIsUp(e.key)} onKeyDown={(e) => whenKeyIsDown(e.key)} onChange={(e) => whenChanged(e.target.value)} className={Style} autoFocus/>            
    )
}

