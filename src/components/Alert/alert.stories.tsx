import React from "react";
import Alert from "./alert";
import {ComponentMeta, ComponentStory, composeStory} from "@storybook/react";
import exp from "constants";

const AlertMete: ComponentMeta<typeof Alert> = {
    title: 'Alert',
    component: Alert,
    tags: ['autodocs'],

}
export default AlertMete

export const Default: ComponentStory<typeof Alert> = (args) => {
    return (<Alert {...args} message="222"></Alert>)
}
Default.storyName = '默认按钮'