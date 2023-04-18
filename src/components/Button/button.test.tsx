import React from "react";
import {fireEvent, render,screen } from "@testing-library/react"
import Button,{ButtonSize,ButtonType,ButtonProps} from "./button";

const defaultProps ={
    onClick:jest.fn()
}


const tetsProps ={
    btnType:ButtonType.Primary,
    className:'buton1',
    size:ButtonSize.Large
}
test('demo',()=>{
    const view =render(<Button {...defaultProps}>nice</Button>)
    const element = screen.queryByText('nice')

    expect(element).toBeTruthy()

    expect(defaultProps.onClick).toHaveBeenCalled()
})


test('demo111',()=>{
    const warpper =render(<Button {...tetsProps}>nice</Button>)
    const element = warpper.queryByText('nice')

    expect(element).toBeInTheDocument()
    // expect(element).toHaveClass('button1')
})

