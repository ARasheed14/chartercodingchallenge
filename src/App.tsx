import React, { Component } from 'react';
import './App.css';
import Search from './Components/Search/Search-Component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Charter Coding CHallenge
          </p>
        </header>
        <Search></Search>
      </div>
    );
  }
}

export default App;
