import {ComponentMeta, ComponentStory} from "@storybook/react";
import AutoComplete from "../AutoComplete";
import Menu from './index'

const MenuMete: ComponentMeta<typeof AutoComplete> = {
    title: 'Menu',
    component: AutoComplete,
    tags: ['autodocs'],
    parameters: {
        docs: {
            source: {
                type: "code",
            },
        }
    }
}
export default MenuMete

export const Default:ComponentStory<typeof Menu>=(args)=>{
    return (  <Menu defaultIndex='0' {...args} >
        <Menu.Item>
            cool link
        </Menu.Item>
        <Menu.Item>
            cool link 2
        </Menu.Item>
        <Menu.Item disabled>
            disabled
        </Menu.Item>
        <Menu.SubMenu title="下拉选项">
            <Menu.Item>
                下拉选项一
            </Menu.Item>
            <Menu.Item>
                下拉选项二
            </Menu.Item>
        </Menu.SubMenu>
    </Menu>)
}
Default.storyName="基本样式"