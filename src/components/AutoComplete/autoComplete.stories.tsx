import React from "react";
import {ComponentMeta, ComponentStory, storiesOf} from "@storybook/react";
import AutoComplete, {AutoCompleteProps, DataSourceType} from "./autoComplete";


interface LakerPlayerProps {
    value: string;
    number: number;
}

interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}

const SimpleComplete: ComponentMeta<typeof AutoComplete> = {
    title: 'AutoComplete',
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
export default SimpleComplete


export const ASimpleComplete: ComponentStory<typeof AutoComplete> = (args) => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
        'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando', 'kobe']
    const handleFetch = (query: string) => {
        return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
    }
    return (
        <AutoComplete
            {...args}
            fetchSuggestions={handleFetch}
            placeholder="输入湖人队球员英文名试试"
        />
    )
}
ASimpleComplete.storyName = '1 基本的搜索'

export const BCustomComplete = (args: JSX.IntrinsicAttributes & AutoCompleteProps) => {
    const lakersWithNumber = [
        {value: 'bradley', number: 11},
        {value: 'pope', number: 1},
        {value: 'caruso', number: 4},
        {value: 'cook', number: 2},
        {value: 'cousins', number: 15},
        {value: 'james', number: 23},
        {value: 'AD', number: 3},
        {value: 'green', number: 14},
        {value: 'howard', number: 39},
        {value: 'kuzma', number: 0},
        {value: 'kobe', number: 24},
    ]
    const handleFetch = (query: string) => {
        return lakersWithNumber.filter(player => player.value.includes(query))
    }
    const renderOption = (item: DataSourceType) => {
        const itemWithNumber = item as DataSourceType<LakerPlayerProps>
        return (
            <>
                <b>名字: {itemWithNumber.value}</b>
                <span>球衣号码: {itemWithNumber.number}</span>
            </>
        )
    }
    return (
        <AutoComplete
            {...args}
            fetchSuggestions={handleFetch}
            placeholder="输入湖人队球员英文,自定义下拉模版"
            renderOption={renderOption}
        />
    )
}
BCustomComplete.storyName = '2 自定义搜索结果模版'

export const CAjaxComplete = (args: JSX.IntrinsicAttributes & AutoCompleteProps) => {
    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({ items }) => {
                return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
            })
    }

    const renderOption = (item: DataSourceType) => {
        const itemWithGithub = item as DataSourceType<GithubUserProps>
        return (
            <>
                <b>Name: {itemWithGithub.value}</b>
                <span>url: {itemWithGithub.url}</span>
            </>
        )
    }
    return (
        <AutoComplete
            {...args}
            fetchSuggestions={handleFetch}
            placeholder="输入 Github 用户名试试"
            renderOption={renderOption}
        />
    )
}
CAjaxComplete.storyName = '3 支持异步搜索'