import React, {useState} from "react";
import Icon from "../Icon/icon";
import classNames from "classnames";
import Transition from "../Transition/transition";

export type  AlertType = 'success' | 'default' | 'danger' | 'warning'

interface AlertProps {
    onClose?: Function
    description?: string
    message: string;
    type?: AlertType
    closable?: boolean;
}

const Alert: React.FC<AlertProps> = (props) => {
    const [hide, setHide] = useState(false)
    const {
        message,
        type,
        description,
        onClose,
        closable
    } = props
    const classes = classNames('viking-alert', {
        [`viking-alert-${type}`]: type,
    })
    const messageClass = classNames('viking-alert-title', {
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
                <span className={messageClass}>{message}</span>
                {description && <p className="viking-alert-desc">{description}</p>}
                {closable && <span className="viking-alert-close" onClick={handleClose}><Icon icon="times"/></span>}
            </div>
        </Transition>
    )
}

export default Alert

Alert.defaultProps = {
    closable: true,
    type: 'success',
    message: '提示',
    description: ''
}
