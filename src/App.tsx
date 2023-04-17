import React from 'react';
import Button,{ButtonType} from './components/Button/button';


function App() {
  return (
    <div className="App">
      <Button btnType={ButtonType.Primary} >222</Button>
      <Button onClick={()=>{console.log(222); }}>yyy</Button>
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

export default App;
