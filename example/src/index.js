import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer, {selectLocalState} from './reducer';
import {localThunk} from 'redux-local-state';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers(reducer), composeEnhancers(applyMiddleware(thunk, localThunk(selectLocalState))));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
