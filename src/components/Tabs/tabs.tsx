import React, {FunctionComponentElement} from "react";
import classNames from "classnames";
import {TabItemProps} from "./tabItem";


interface TabsProps {
    defaultIndex?: number,
    className?: string,
    onSelect?: Function,
    type?: string,
    children?: React.ReactNode
}


const Tabs: React.FC<TabsProps> = (props) => {
    const {defaultIndex, children, className, onSelect, type} = props
    console.log(React.Children)
    const handleClick=()=>{
        console.log('222')
    }
    const renderNavLinks = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<TabItemProps>
            const {label, disabled} = childElement.props
            const classes = classNames('viking-tabs-nav-item', {
                'disabled': disabled,
            })
            return (
                <li
                    className={classes}
                    key={`nav-item-${index}`}
                    onClick={(e)=>{handleClick()}}
                >
                    {label}
                </li>
            )
        })
    }

    return (
        <div className={`viking-tabs ${className || ''}`}>
            <ul>
                {renderNavLinks()}
            </ul>
        </div>
    )
}


export default Tabs


Tabs.defaultProps = {
    type: 'card'
}