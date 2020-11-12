import React from 'react'
import '../index.css'

export const InputCheckbox = ({ Style, whenClicked , checkedStatus }) => {
    return (
        // <div className="inputDiv">
        <input type="checkbox" checked={checkedStatus} onClick={whenClicked} className={Style} />
        // </div>
    )
}