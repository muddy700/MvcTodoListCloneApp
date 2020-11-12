import React from 'react'
import '../index.css'

export const Input = ({type , placeholder , Style , whenChanged , checkedStatus , whenKeyIsDown , value}) => {
    return(
        // <div className="inputDiv">
            <input type ={type} value={value} placeholder={placeholder} checked={checkedStatus} onKeyDown={(e) => whenKeyIsDown(e.key)} onChange={(e) => whenChanged(e.target.value)} className={Style}/>            
        // </div>
    )
}