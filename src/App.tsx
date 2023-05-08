import React, {useEffect, useState} from 'react';
import Menu from "./components/Menu/menu";
import MenuItem from './components/Menu/menuItem'
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import Tabs from "./components/Tabs/tabs";
import  {library} from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import Input from "./components/Input/input";
import axios from "axios";
import TabItem from "./components/Tabs/tabItem";
library.add(fas)
function App() {
    const [title,setTitle]=useState('')
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts/1').then(resp=>{
            setTitle(resp.data.title)
        })
    })
  return (
    <div className="App" >
        <Tabs>
            <TabItem label="111">
                3333
            </TabItem>
        </Tabs>
        {/*<h2>{title}</h2>*/}
        {/*<Input*/}
        {/*    size="lg"*/}
        {/*    defaultValue="22"*/}
        {/*    icon="coffee"*/}
        {/*    prepend={<div>222</div>}*/}
        {/*    onChange={e=>{console.log(e.target)}}*/}
        {/*></Input>*/}
        {/*<Icon icon="coffee" theme="primary"/>*/}


        {/*<Menu defaultIndex='2' mode='vertical'  onSelect={handleClick} defaultOpenSubMenus={['2']}>*/}
        {/*    <MenuItem>color index</MenuItem>*/}
        {/*    <MenuItem>color index</MenuItem>*/}
        {/*    <SubMenu title='2'>*/}
        {/*        <MenuItem>2</MenuItem>*/}
        {/*    </SubMenu>*/}
        {/*</Menu>*/}


    </div>
  );
}
function handleClick(){
    console.log(222)
}
export default App;
