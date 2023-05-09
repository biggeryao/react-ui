import React, {createContext} from "react";
import useStore from "./useStore";
import {ValidateError} from "async-validator";

interface FormProps {
    name?: string
    initialValues?: Record<string, any>
    children?: React.ReactNode
    onFinish?:(values:Record<string, any>)=>void
    onFinishFailed?:(values:Record<string, any>,errors:Record<string, ValidateError[]>)=>void
}

export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields'|'validateField'> & Pick<FormProps, 'initialValues'>

export const FormContext = createContext<IFormContext>({} as IFormContext)
const Form: React.FC<FormProps> = (props) => {
    const {name, children,initialValues,onFinish,onFinishFailed} = props
    const {form, fields, dispatch,validateField,validateAllFields} = useStore()
    const passedContext: IFormContext = {
        dispatch,
        fields,
        initialValues,
        validateField
    }

    const submitForm=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        e.stopPropagation()
        const {isValid,errors,values}=await validateAllFields()
        console.log('2222')
        if(isValid&&onFinish){
            onFinish(values)
        }else if(!isValid&&onFinishFailed){
            onFinishFailed(values,errors)
        }
    }
    return (
        <div>
            <div>{JSON.stringify(form)}</div>
            <div>{JSON.stringify(fields)}</div>
            <form name={name} className="viking-form"  onSubmit={submitForm}>
                <FormContext.Provider value={passedContext}>
                    {children}
                </FormContext.Provider>
            </form>
        </div>


    )
}


export default Form

Form.defaultProps = {
    name: 'viking-form'
}