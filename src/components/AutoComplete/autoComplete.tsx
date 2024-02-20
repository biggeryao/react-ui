import React, {ChangeEvent, FC, KeyboardEvent, ReactElement, useEffect, useRef, useState} from "react";
import Input, {InputProps} from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";

interface DataSourceObject {
    value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
    /**
     * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
     * type DataSourceType<T = {}> = T & DataSourceObject
     */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 点击选中建议项时触发的回调*/
    onSelect?: (item: DataSourceType) => void;
    /** 文本框发生改变的时候触发的事件*/
    onChange?: (value: string) => void;
    /**支持自定义渲染下拉项，返回 ReactElement */
    renderOption?: (item: DataSourceType) => ReactElement
}

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'yao-react-ui'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {fetchSuggestions, onSelect, value, renderOption, ...restProps} = props
    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestion] = useState<DataSourceType[]>([])
    const [loading, setLoding] = useState(false)
    const [highLightIndex, setHighLightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debounceValue = useDebounce(inputValue, 500)
    useClickOutside(componentRef, () => {
        setSuggestion([])
    })
    useEffect(() => {
        if (debounceValue && triggerSearch) {
            const results = fetchSuggestions(debounceValue)
            if (results instanceof Promise) {
                setLoding(true)
                results.then(data => {
                    setLoding(false)
                    setSuggestion(data)
                })
            } else {
                setSuggestion(results)
            }
        } else {
            setSuggestion([])
        }
        setHighLightIndex(-1)
    }, [debounceValue])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    const highLight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighLightIndex(index)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highLightIndex]) {
                    handleSelect(suggestions[highLightIndex])
                }
                break
            case 38:
                highLight(highLightIndex - 1)
                break
            case 40:
                highLight(highLightIndex + 1)
                break
            case 27:
                setSuggestion([])
                break
            default:
                break
        }

    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const generateDropdown = () => {
        return (
            <ul className="viking-suggestion-list">
                {loading &&
                    <div className="suggestions-loading-icon">
                        <Icon icon="spinner" spin/>
                    </div>
                }
                {suggestions.map((item, index) => {
                    const className = classNames('suggestion-item', {
                        'is-active': index === highLightIndex
                    })
                    return (
                        <li className={className} onClick={() => {
                            handleSelect(item)
                        }} key={index}>
                            {renderTemplate(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestion([])
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }
    return (
        <div className="viking-auto-complete" ref={componentRef}>
            <Input
                value={inputValue}
                {...restProps}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    )
}
export default AutoComplete
