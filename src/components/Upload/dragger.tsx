import React, {FC, ReactNode, useState} from "react";
import classNames from "classnames";

interface  DraggerProps{
    onFile?:(files:FileList)=>void
    children:ReactNode
}

export  const Dragger :FC<DraggerProps> =(props)=>{
    const {onFile,children}=props
    const [dragOver,setDragOver]=useState(false)
    const classes =classNames('viking-uploader-dragger',{
        'is-dragOver':dragOver
    })

    const handleDrop=(e:React.DragEvent<HTMLElement>)=>{
        e.preventDefault()
        setDragOver(false)
        if (onFile) {
            onFile(e.dataTransfer.files)
        }
    }
    const handleDrag= (e: React.DragEvent<HTMLElement>, over: boolean)=>{
        e.preventDefault()
        setDragOver(over)
    }
    return (
        <div
            className={classes}
            onDragOver={e=>{handleDrag(e,true)}}
            onDragLeave={e=>{handleDrag(e,false)}}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}


export default  Dragger