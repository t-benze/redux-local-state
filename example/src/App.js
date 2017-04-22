import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {connect } from 'react-redux';
import ComponentWilLocalState from './ComponentWithLocalState';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponentWilLocalState: false,
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>
          <p>global counter: {this.props.counter}</p>
        </div>
        <div>
          <button onClick={() => {this.setState({showComponentWilLocalState: true})}}>show local</button>
          <button onClick={() => {this.setState({showComponentWilLocalState: false})}}>remove local</button>
        </div>
        {this.state.showComponentWilLocalState && 
          <ComponentWilLocalState />
        }
      </div>
    );
  }
}

export default connect((state) => {
  return {
    counter: state.counter
  }
})(App);
