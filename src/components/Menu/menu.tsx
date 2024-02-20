import React, {useState, createContext, FC} from "react";
import classNames from "classnames";
import  {MenuItemProps} from "./menuItem";

type MenuMode = 'horizontal' | 'vertical'

type SelectCallback = (selectIndex: string) => void

export interface MenuProps {
    /**默认 active 的菜单项的索引值 */
    defaultIndex?: string;
    className?: string,
    /**菜单类型 横向或者纵向 */
    mode?: MenuMode,
    style?: React.CSSProperties,
    children: React.ReactNode,
    /**点击菜单项触发的回掉函数 */
    onSelect?: SelectCallback,
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?:string[]
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback,
    mode?:MenuMode,
    defaultOpenSubMenus?:string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 *
 * ```javascript
 * import { Menu } from 'yao-react-ui'
 *
 * //然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ```
 */
export const Menu: FC<MenuProps> = (props) => {

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
