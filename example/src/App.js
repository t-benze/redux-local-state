import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import PageWithLocalStore from './PageWithLocalStore/index.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPageWithLocalStore: false,
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
    );
  }
}

export default App;
