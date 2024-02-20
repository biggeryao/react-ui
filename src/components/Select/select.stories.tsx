import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import Select from './index'

const SelectMete: ComponentMeta<typeof Select> = {
  title: 'Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    }
  }
}
export default SelectMete


export const ADefaultSelect:ComponentStory<typeof Select> = (args) => (
  <Select
    {...args}
    placeholder="请选择"
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
    <Select.Option value="disabled" disabled/>
    <Select.Option value="nihao5" />
  </Select>
)
ADefaultSelect.storyName = '默认的Select'
export const BMultipleSelect :ComponentStory<typeof Select>= (args) => (
  <Select
    {...args}
    placeholder="支持多选欧！"
    multiple
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
    <Select.Option value="viking" />
    <Select.Option value="viking2" />
  </Select>
)
BMultipleSelect.storyName = '支持多选的 Select'
export const CDisabledSelect:ComponentStory<typeof Select> = (args) => (
  <Select
    {...args}
    placeholder="禁用啦！"
    disabled
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
  </Select>
)
CDisabledSelect.storyName = '被禁用的 Select'
