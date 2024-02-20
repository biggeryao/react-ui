import React, {ReactNode} from "react";


export interface TabItemProps{
    label: string | React.ReactElement;
    disabled?:boolean,
    children?: ReactNode;
}
const TabItem:React.FC<TabItemProps>=({children})=>{

    return (
        <div className="viking-tab-panel">
            {children}
        </div>
    )
}

export default  TabItem
