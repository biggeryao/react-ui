import React from 'react';
import Button,{ButtonType} from './components/Button/button';
import Menu from "./components/Menu/menu";
import MenuItem from './components/Menu/menuItem'
import SubMenu from "./components/Menu/subMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Icon from "./components/Icon/icon";
import  {library} from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
function App() {
  return (
    <div className="App">
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
