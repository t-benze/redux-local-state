/**
 * Created by tangbz on 3/31/17.
 */

import React, { PureComponent, PropTypes, createElement } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import invariant from "invariant";

import {
  discardLocalState,
  registerLocalState,
  dispatchLocalAction
} from "./actions";

import getLocalStateId from "./localStateId";

export default function createConnectLocal(getLocalState) {
  const getLocalStateById = (state, id) => getLocalState(state)[id];
  return connectLocal.bind(null, getLocalStateById);
}


export function connectLocal(
  getLocalStateById,
  mapStateToProps,
  mapDispatchToProps,
  localStoreConfig,
  mergeProps,
  connectOptions = {}
) {

  invariant(
    typeof localStoreConfig.reducer === "function",
    "local store config must provides a reducer function"
  );
  const localMapStateToProps = localStoreConfig.mapStateToProps || (() => ({}));
  const localMapDispatchToProps = localStoreConfig.mapDispatchToProps || {};

  function modifiedMapStateToProps(state, props) {
    const globalStateProps = mapStateToProps(state, props);
    const localStore = getLocalStateById(state, props.$$localStateId);
    const localStateProps = localMapStateToProps(localStore.state, props);
    return {
      ...globalStateProps,
      ...localStateProps
    };
  }

  function getLocalProps(store, localStateId) {
    const props = {$$localStateId: localStateId};
    invariant(
      typeof localMapDispatchToProps === "object",
      "local MapDispatchToProps should be an object"
    );
    Object.keys(localMapDispatchToProps).forEach(key => {
      props[key] = (...args) => {
        store.dispatch(
          dispatchLocalAction(localStateId, localMapDispatchToProps[key](...args))
        );
      };
    });
    return props;
  }

  const {
    storeKey = "store",
    getDisplayName = name => `ConnectLocal${name}`
  } = connectOptions;
  const contextTypes = {
    [storeKey]: PropTypes.object
  };

  return function wrapWithLocalConnect(WrappedComponent) {
    invariant(
      typeof WrappedComponent == "function",
      `You must pass a component to the function returned by ` +
        `connectLocal. Instead received ${JSON.stringify(WrappedComponent)}`
    );

    const wrappedComponentName =
      WrappedComponent.displayName || WrappedComponent.name || "Component";

    const displayName = getDisplayName(wrappedComponentName);

    const ConnectedComponent = connect(
      modifiedMapStateToProps,
      mapDispatchToProps,
      mergeProps,
      connectOptions
    )(WrappedComponent);

    class LocalConnect extends PureComponent {
      constructor(props, context) {
        super(props);
        this.state = {
          isLocalStoreReady: false
        };
        this.localStateId = getLocalStateId();
        this.store = props[storeKey] || context[storeKey];

        invariant(
          this.store,
          `Could not find "${storeKey}" in either the context or props of ` +
            `"${displayName}". Either wrap the root component in a <Provider>, ` +
            `or explicitly pass "${storeKey}" as a prop to "${displayName}".`
        );

        this.unsubscribe = this.store.subscribe(() => {
          const state = this.store.getState();
          if (getLocalStateById(state, this.localStateId)) {
            this.setState({
              isLocalStoreReady: true
            });
            this.unsubscribe();
          }
        });
      }

      componentWillMount() {
        this.store.dispatch(
          registerLocalState(this.localStateId, localStoreConfig.reducer)
        );
      }

      componentWillUnmount() {
        setTimeout(() => {
          this.store.dispatch(discardLocalState(this.localStateId));
        });
      }

      render() {
        if (this.state.isLocalStoreReady) {
          return createElement(
            ConnectedComponent,
            getLocalProps(this.store, this.localStateId)
          );
        } else {
          return null;
        }
      }
    }

    LocalConnect.contextTypes = {
      [storeKey]: PropTypes.object
    };
    return LocalConnect;
  };
}
