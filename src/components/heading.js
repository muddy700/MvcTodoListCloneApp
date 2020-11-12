import React from 'react'
import '../index.css'

export const Heading = ({title} , {typingMode}) => {

    return (
        <div className="title">
         <h1 className="title">{title}</h1>
         {/* <h3 hidden={typingMode === 'on' ? false : true}>Typing....</h3> */}
        </div>
    )
}