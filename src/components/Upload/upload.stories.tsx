import React from "react";
import {ComponentMeta, ComponentStory, storiesOf} from "@storybook/react";
import Upload, {UploadFile} from "./upload";
import {FILE} from "dns";
import Icon from "../Icon/icon";
import Button from "../Button";


const upLoadMeta: ComponentMeta<typeof Upload> = {
    title: 'Upload',
    component: Upload,
    tags: ['autodocs'],

}
export default upLoadMeta

export const ASimpleUpload: ComponentStory<typeof Upload> = (args) => (
    <Upload
        {...args}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
        <Button size="lg" btnType="primary"><Icon icon="upload"/> 点击上传 </Button>
    </Upload>
)
ASimpleUpload.storyName = '普通的 Upload 组件'
export const BCheckUpload: ComponentStory<typeof Upload> = (args) => {
    const checkFileSize = (file: File) => {
        if (Math.round(file.size / 1024) > 50) {
            alert('file too big')
            return false;
        }
        return true;
    }
    return (
        <Upload
            {...args}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={checkFileSize}
        >
            <Button size="lg" btnType="primary"><Icon icon="upload"/> 不能传大于50Kb！ </Button>
        </Upload>
    )
}
BCheckUpload.storyName = '上传前检查文件大小'
export const CDragUpload: ComponentStory<typeof Upload> = (args) => (
    <Upload
        {...args}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        name="fileName"
        multiple
        drag
    >
        <Icon icon="upload" size="5x" theme="secondary"/>
        <br/>
        <p>点击或者拖动到此区域进行上传</p>
    </Upload>
)
CDragUpload.storyName = '拖动上传'
