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
    return (<Alert {...args} title="Alert!" type="success"></Alert>)
}
export const CDescAlert: ComponentStory<typeof Alert> = (args) => {
    return (<Alert {...args} title="Alert!" description="描述" type="success"></Alert>)
}
export const BStylesAlert: ComponentStory<typeof Alert> = (args) => {
    return (
        <>
            <Alert title="this is Success" type="success"></Alert>
            <Alert title="this is Danger!" type="danger"></Alert>
            <Alert title="this is Warning!" type="warning" closable={false}></Alert>
        </>
    )
}

Default.storyName = '基本样式'
CDescAlert.storyName = '带描述的 Alert'
BStylesAlert.storyName = '不同样式的 Alert'
