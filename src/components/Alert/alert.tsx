import React, {FC, useState} from "react";
import Icon from "../Icon/icon";
import classNames from "classnames";
import Transition from "../Transition/transition";

export type  AlertType = 'success' | 'default' | 'danger' | 'warning'

interface AlertProps {
    /**标题 */
    title: string;
    /**描述 */
    description?: string;
    /**类型 四种可选 针对四种不同的场景 */
    type?: AlertType;
    /**关闭alert时触发的事件 */
    onClose?: () => void;
    /**是否显示关闭图标*/
    closable?: boolean;
}

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ```javascript
 * import { Button } from 'yao-react-ui'
 * ```
 */
export const Alert: FC<AlertProps> = (props) => {
    const [hide, setHide] = useState(false)
    const {
        title,
        type,
        description,
        onClose,
        closable
    } = props
    const classes = classNames('viking-alert', {
        [`viking-alert-${type}`]: type,
    })
    const titleClass = classNames('viking-alert-title', {
        'bold-title': description
    })
    const handleClose = () => {
        if (onClose) {
            onClose()
        }
        setHide(true)
    }
    return (
        <Transition
            in={!hide}
            timeout={300}
            animation="zoom-in-top"
        >
            <div className={classes}>
                <span className={titleClass}>{title}</span>
                {description && <p className="viking-alert-desc">{description}</p>}
                {closable && <span className="viking-alert-close" onClick={handleClose}><Icon icon="times"/></span>}
            </div>
        </Transition>
    )
}


Alert.defaultProps = {
    type: 'default',
    closable: true,
}
export default Alert;
