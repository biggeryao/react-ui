import React from 'react';
import Button,{ButtonType} from './components/Button/button';
import Menu from "./components/Menu/menu";
import MenuItem from './components/Menu/menuItem'
import SubMenu from "./components/Menu/subMenu";
function App() {
  return (
    <div className="App">
        <Menu defaultIndex='1' mode='vertical'  onSelect={handleClick}>
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
