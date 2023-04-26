import React from "react";
import {ComponentStory} from "@storybook/react";
import Button from "../Button/button";
import buttonMete from "../Button/button.stories";
import Icon from "../Icon/icon";

export type  AlertType= 'success' | 'default' | 'danger' | 'warning'
interface AlertProps{
    onClose?:Function
    description?:string
    message: string;
    type?:AlertType
    closable?: boolean;
}
const Alert:React.FC<AlertProps>=(props)=>{
    const {
        message,
        type,
        description,
        onClose,
        closable
    }=props
    return (
        <div>
            <div>
                <span>{message}</span>
                <Icon icon="close"/>
            </div>
            <span>{description}</span>
        </div>
    )
}

export default Alert
