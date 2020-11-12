import React from 'react'

export const Label = ({ value , whenClicked , Style , hiddingMode}) => {
    return (
        <div className="divLable">
            <label className={Style ? Style : "lableStyle"} onClick={whenClicked} hidden={hiddingMode} > {value}</label>
        </div>
    )
}