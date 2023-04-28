import React from "react";
import Alert from "./alert";
import {ComponentMeta, ComponentStory, composeStory} from "@storybook/react";

const AlertMete: ComponentMeta<typeof Alert> = {
    title: 'Alert',
    component: Alert,
    tags: ['autodocs'],

}
export default AlertMete

export const Default: ComponentStory<typeof Alert> = (args) => {
    return (<Alert {...args} message="222" description="333" type="success"></Alert>)
}
Default.storyName = '默认按钮'