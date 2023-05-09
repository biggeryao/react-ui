import React, {useContext, useEffect} from "react";
import classNames from "classnames";
import {FormContext} from './form'
import Schema,{RuleItem} from "async-validator";
import {CustomRule} from "./useStore";
interface FormItemProps {
    name: string
    label?: string
    children?: React.ReactNode
    valuePropName?: string
    trigger?: string
    getValueFromEvent?: (event: any) => any
    rules?:CustomRule[]
    validateTrigger?:string
}

const FormItem: React.FC<FormItemProps> = (props) => {
    const {
        label,
        children,
        name,
        getValueFromEvent,
        valuePropName,
        trigger,
        rules,
        validateTrigger
    } = props
    const {dispatch, fields, initialValues,validateField} = useContext(FormContext)
    const rowClass = classNames('viking-row', {
        'viking-row-no-label': !label
    })
    useEffect(() => {
        const value = (initialValues && initialValues[name]) || ''
        dispatch({type: 'addField', name, value: {label, name, value,rules:rules||[],errors:[],isValid:true}})
    }, [])
    const fieldState = fields[name]
    const value = fieldState && fieldState.value
    const errors=fieldState && fieldState.errors
    const isRequired=rules?.some(rule=>(typeof rule!=='function')&&rule.required)
    const hasError=errors &&errors.length>0
    const labelClass=classNames({
        'viking-form-item-required':isRequired
    })
    const itemClass=classNames('viking-form-item-control',{
        'viking-form-item-has-error':hasError
    })
    const onValueUpdate = (e: any) => {
        const value = getValueFromEvent && getValueFromEvent(e)
        dispatch({type: "updateValue", name, value})
    }
    const onValueValidate=async ()=>{
        await validateField(name)
    }
    const controlProps: Record<string, any> = {}
    controlProps[valuePropName!] = value
    controlProps[trigger!] = onValueUpdate
    if(rules){
        controlProps[validateTrigger!]=onValueValidate
    }
    const childList = React.Children.toArray(children)
    if (childList.length === 0) {
        console.error('没有子组件')
    }

    if (childList.length > 1) {
        console.warn('只支持一个element')
    }
    if (!React.isValidElement(childList[0])) {
        console.error('child不是React Element')
    }
    const child = childList[0] as React.ReactElement
    const returnChildNode = React.cloneElement(
        child,
        {...child.props, ...controlProps}
    )
    return (
        <div className={rowClass}>
            {label &&
                <div className="viking-form-item-label">
                    <label className={labelClass} title={label}>{label}</label>
                </div>}

            <div className="viking-form-item">
                <div className={itemClass}>
                    {returnChildNode}
                </div>
                {
                    hasError&&
                    <div className="viking-form-item-explain">
                        <span>{errors[0].message}</span>
                    </div>
                }
            </div>
        </div>
    )
}
FormItem.defaultProps = {
    valuePropName: 'value',
    trigger: 'onChange',
    getValueFromEvent: (e) => e.target.value,
    validateTrigger:'onBlur'

}

export default FormItem