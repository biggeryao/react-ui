import React, {useState, createContext} from "react";
import classNames from "classnames";
import  {MenuItemProps} from "./menuItem";

type MenuMode = 'horizontal' | 'vertical'

type SelectCallback = (selectIndex: string) => void

export interface MenuProps {
    defaultIndex?: string;
    className?: string,
    mode?: MenuMode,
    style?: React.CSSProperties,
    children: React.ReactNode,
    onSelect?: SelectCallback,
    defaultOpenSubMenus?:string[]
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback,
    mode?:MenuMode,
    defaultOpenSubMenus?:string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {

    const {className, mode, style, children, defaultIndex, onSelect,defaultOpenSubMenus} = props
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    })

    const handleClick =(index:string)=>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect:handleClick,
        mode,
        defaultOpenSubMenus
    }

    const renderChildren=()=>{
        return React.Children.map(children,(child,index)=>{
            const childrenElement=child as React.FunctionComponentElement<MenuItemProps>
            const {name}=childrenElement.type
            if(name==='MenuItem'||name==='SubMenu'){
                return React.cloneElement(childrenElement,{
                    index:index.toString()
                })

            }else {
                console.error('warning Menu has a childrn')
            }
        })
    }
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus:[]
}

export default Menu