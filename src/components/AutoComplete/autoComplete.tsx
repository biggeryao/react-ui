import React, {ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef, useState} from "react";
import Input, {InputProps} from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
interface DataSourceObject {
    value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void,
    renderOption?: (item: DataSourceType) => ReactElement
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {fetchSuggestions, onSelect, value, renderOption, ...restProps} = props
    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestion] = useState<DataSourceType[]>([])
    const [loading, setLoding] = useState(false)
    const [highLightIndex, setHighLightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef=useRef<HTMLDivElement>(null)
    const debounceValue = useDebounce(inputValue, 500)
    useClickOutside(componentRef,()=>{
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
                { loading &&
                    <div className="suggstions-loading-icon">
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