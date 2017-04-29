import React, { PureComponent } from "react";
import connectLocal from "./connectLocal";

import { incrementCounter, incrementCounterAsync } from "./counterActions";
import counterReducer from "./counterReducer";

class ComponentWithLocalStore extends PureComponent {
  render() {
    return (
      <div>
        <h1>Component With Local State</h1>
        <div>
          <p>Global Counter:</p>
          <p>{this.props.globalCounter}</p>
          <p>Local Counter:</p>
          <p>{this.props.localCounter}</p>
        </div>
        <div>
          <button
            onClick={() => {
              this.props.incrementCounter();
            }}
          >
            increment gloal counter
          </button>
          <button
            onClick={() => {
              this.props.incrementCounterAsync();
            }}
          >
            increment global counter async
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              this.props.incrementLocalCounter();
            }}
          >
            increment local counter
          </button>
          <button
            onClick={() => {
              this.props.incrementLocalCounterAsync(this.props.$$localStoreId);
            }}
          >
            increment local counter async
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  globalCounter: state.counter
});

export default connectLocal(
  mapStateToProps,
  {
    incrementCounter,
    incrementCounterAsync
  },
  {
    mapStateToProps: state => {
      return {
        localCounter: state
      };
    },
    mapDispatchToProps: {
      incrementLocalCounter: incrementCounter,
      incrementLocalCounterAsync: incrementCounterAsync
    },
    reducer: counterReducer
  }
)(ComponentWithLocalStore);
