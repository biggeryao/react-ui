import React, {ReactNode} from "react";


export interface TabItemProps{
    label?:string,
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