import React from 'react'

export const Label = ({ value , whenClicked , Style , typingMode}) => {
    return (
        <div className="divLable">
            <label className={Style ? Style : "lableStyle"} onClick={whenClicked} hidden={typingMode} > {value}</label>
        </div>
    )
}