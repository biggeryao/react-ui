import React from "react";
import {fireEvent, render } from "@testing-library/react"
import Button,{ButtonSize,ButtonType,ButtonProps} from "./button";

const defaultProps ={
    onClick:jest.fn()
}


const tetsProps ={
    btnType:ButtonType.Primary,
    className:'buton1',
    size:ButtonSize.Large
}
test('test demo',()=>{
    const warpper =render(<Button {...defaultProps}>nice</Button>)
    const element = warpper.queryByText('nice')
    
    expect(element).toBeTruthy

    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled
})


test('demo111',()=>{
    const warpper =render(<Button {...tetsProps}>nice</Button>)
    const element = warpper.queryByText('nice')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('button1')
})

