import React from "react";
import Button from "./button";
import {ComponentMeta, ComponentStory, composeStory} from "@storybook/react";
import exp from "constants";

const buttonMete: ComponentMeta<typeof Button> = {
    title: 'Button',
    component: Button,
    tags: ['autodocs'],

}

export default buttonMete

export const Default: ComponentStory<typeof Button> = (args) => {
    return (<Button {...args}>default button</Button>)
}
Default.storyName = '默认按钮'

export const ButtonWithSize: ComponentStory<typeof Button> = (args) => {
    return (
        <div>
            <Button {...args} size="lg">不同尺寸的按钮</Button>
            <Button style={{marginLeft:'10px'}} {...args} size="sm">不同尺寸的按钮</Button>
        </div>
    )
}
ButtonWithSize.storyName = '不同尺寸的按钮'

export const ButtonWithType:ComponentStory<typeof Button>=(args)=>{
    return (<div>
        <Button {...args} btnType="primary">Primary button</Button>
        <Button {...args} btnType="danger">Danger button</Button>
        <Button {...args} btnType="link" href="baidu.com">Link button</Button>
    </div>)
}
ButtonWithType.storyName='不同类型的按钮'