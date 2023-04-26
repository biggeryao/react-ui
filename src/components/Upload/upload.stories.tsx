import React from "react";
import {ComponentMeta, ComponentStory, storiesOf} from "@storybook/react";
import Upload, {UploadFile} from "./upload";
import {FILE} from "dns";
import Icon from "../Icon/icon";


export default {
    title: 'upload 组件',
    component: Upload,
    id: 'Upload',
    parameters: {
        docs: {
            source: {
                type: "code",
            },
        }
    }
    // argTypes: { onClick: { action: 'clicked' }, onSelect: { action: 'selected' }, onChange: { action: 'changed' } },
} as ComponentMeta<typeof Upload>

const SimpleComplete: ComponentMeta<typeof Upload> = {
    title: 'AutoComplete',
    component: Upload,
    tags: ['autodocs'],

}

const beforeUpload = (file: File) => {
    // if(Math.round(file.size/1024)>50){
    //     alert('to big')
    //     return false
    // }else {
    //     return  true
    // }

    // const newFile=new File(['file'],'new.doc',{type:file.type})
    // return Promise.resolve(newFile)
}

const changeFile = (file: File) => {

}
const defaultFileList: UploadFile[] = [
    {uid: '111', size: 22, name: 'xxx.md', status: 'success', percent: 20},
    {uid: '1121', size: 123, name: 'xxx1.md', status: 'error', percent: 20},
    {uid: '1131', size: 444, name: 'xxx2.md', status: 'uploading', percent: 20},
]
export const SimpleComplete1: ComponentStory<typeof Upload> = (args) => {

    return (
        <Upload
            {...args}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            name="fileName"
            multiple
            drag
        >
            <Icon icon="upload" size="5x" theme="secondary" />
            <br/>
            <p>点击或者拖动到此区域进行上传</p>
        </Upload>
    )
}
SimpleComplete1.storyName = 'upload 组件'