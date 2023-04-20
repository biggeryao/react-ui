import React from "react";
import Button from "./button";
import {ComponentMeta, ComponentStory, composeStory} from "@storybook/react";
import exp from "constants";

const buttonMete: ComponentMeta<typeof Button> = {
    title: 'button',
    component: Button,
    tags: ['autodocs'],

}

export default buttonMete

export const Default: ComponentStory<typeof Button> = (args) => {
    return (<Button {...args}>default button</Button>)
}
Default.storyName = '默认按钮'

export const ButtonWithSize: ComponentStory<typeof Button> = () => {
    return (
        <Button size="lg"></Button>
    )
}
ButtonWithSize.storyName = '不同尺寸的按钮'