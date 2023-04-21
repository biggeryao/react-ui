import React from "react";
import {ComponentMeta, ComponentStory, storiesOf} from "@storybook/react";
import {action} from  '@storybook/addon-actions'
import AutoComplete, {DataSourceType} from "./autoComplete";
import {string} from "prop-types";
import Button from "../Button/button";


interface LakerObjProps {
    value:string,
    name:string
}
export default {
    title: 'AutoComplete 组件',
    component: AutoComplete,
    id: 'AutoComplete',
    parameters: {
        docs: {
            source: {
                type: "code",
            },
        }
    }
    // argTypes: { onClick: { action: 'clicked' }, onSelect: { action: 'selected' }, onChange: { action: 'changed' } },
} as ComponentMeta<typeof AutoComplete>

const SimpleComplete: ComponentMeta<typeof AutoComplete> = {
    title: 'AutoComplete',
    component: AutoComplete,
    tags: ['autodocs'],

}


export const SimpleComplete1: ComponentStory<typeof AutoComplete> = (args) => {

    const lakers=[
        'a','2,','231','12312','1231sad','asdas'
    ]
    const lakerObj=[
        {value:'Y',name:"2"},
        {value:'Y1',name:"22"},
        {value:'Y12',name:"223"},
        {value:'Y125',name:"1223"},
    ]
    // const handleFetch=(query:string)=>{
    //     return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
    // }
    // const handleFetch=(query:string)=>{
    // return lakerObj.filter(item=>item.value.includes(query))
    // }
    // const renderOption=(str:string)=>{
    //     return (
    //         <>name:{str}</>
    //     )
    // }

    const handleFetch=(query:string)=>{
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res=>res.json())
            .then(({items})=>{
              return items.slice(0,10).map((item:any)=>({value:item.login,...item}))
            })
    }
    const renderOption=(item:DataSourceType)=>{
        const obj=item as DataSourceType<LakerObjProps>
        return (
            <>name:{obj.value} {obj.name}</>
        )
    }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
            renderOption={renderOption}
        ></AutoComplete>
    )
}
SimpleComplete1.storyName = '默认按钮'