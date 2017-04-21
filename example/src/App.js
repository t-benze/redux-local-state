import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {connect } from 'react-redux';
import PageWithLocalStore from './PageWithLocalStore';

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
        <div>
          <p>global counter: {this.props.counter}</p>
        </div>
        <div>
          <button onClick={() => {this.setState({showPageWithLocalStore: true})}}>show local</button>
          <button onClick={() => {this.setState({showPageWithLocalStore: false})}}>remove local</button>
        </div>
        {this.state.showPageWithLocalStore && 
          <PageWithLocalStore />
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
