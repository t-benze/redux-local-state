import React, { Component } from "react";

import "./App.css";
import { connect } from "react-redux";
import ComponentWithLocalState from "./ComponentWithLocalState";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponentWithLocalState: false
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header" >
          <h2 className="App-header__text">Redux Local State Demo</h2>
          </div>
        <div>
          <p>global counter: {this.props.counter}</p>
        </div>
        <div>
          <button
            onClick={() => {
              this.setState({ showComponentWithLocalState: true });
            }}
          >
            show local
          </button>
          <button
            onClick={() => {
              this.setState({ showComponentWithLocalState: false });
            }}
          >
            remove local
          </button>
        </div>
        {this.state.showComponentWithLocalState && <ComponentWithLocalState />}
      </div>
    );
  }
}

export default connect(state => {
  return {
    counter: state.counter
  };
})(App);
