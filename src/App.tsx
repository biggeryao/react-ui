import React from 'react';
import Menu from "./components/Menu/menu";
import MenuItem from './components/Menu/menuItem'
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import  {library} from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import Input from "./components/Input/input";

library.add(fas)
function App() {
  return (
    <div className="App" >


        <Input
            size="lg"
            defaultValue="22"
            icon="coffee"
            prepend={<div>222</div>}
            onChange={e=>{console.log(e.target)}}
        ></Input>
        <Icon icon="coffee" theme="primary"/>


        <Menu defaultIndex='2' mode='vertical'  onSelect={handleClick} defaultOpenSubMenus={['2']}>
            <MenuItem>color index</MenuItem>
            <MenuItem>color index</MenuItem>
            <SubMenu title='2'>
                <MenuItem>2</MenuItem>
            </SubMenu>
        </Menu>


      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
function handleClick(){
    console.log(222)
}
export default App;
