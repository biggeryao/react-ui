import React, {ChangeEvent, InputHTMLAttributes, ReactElement} from "react";
import classNames from 'classnames'
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";


type  InputSize = 'lg' | 'sm'

//InputHTMLAttributes中有 size（number）和InputProps定义的size（string）冲突了。使用Omit 忽略size
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean,
    size?: InputSize,
    icon?: IconProp,
    prepend?: string | ReactElement,
    append?: string | ReactElement,
    onChange?:(e:ChangeEvent<HTMLInputElement>)=>void
}


export const Input: React.FC<InputProps> = (props) => {
    //取出不同的属性
    const {disabled, size, icon, prepend, append, style,onChange, ...restProps} = props

    //根据不同属性设置不同的className
    const classes = classNames('viking-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend,
    })
    //根据属性判断是否要添加特定的节点
    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }
    if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }
    return (
        <div className={classes} style={style}>
            {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
            <input
                onChange={onChange}
                className="viking-input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="viking-input-group-append">{append}</div>}
        </div>
    )
}
export default Input