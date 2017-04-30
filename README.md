## redux-local-state

A Redux add-on to support create local state for React Component in redux store, which lives only within the component's lifecycle. Check this [post](https://medium.com/@tangbenze/introduce-redux-local-state-to-your-react-app-9f96f18d4f35) for the rationale behind.

### Usage 

`npm install redux-local-state --save`

#### Inject local reducer to gloabl reducer

```js
import {combineReducers} from 'redux';
import {reducer as local} from 'redux-local-state';

const reducer = combineReducers({
  local,
  ...otherReducers
});
const store = createStore(reducer);
```
#### provide selector for local reducer to connectLocal

create a file connectLocal.js

```js
import {createConnectLocal} from 'reduc-local-state';

const selectLocalState = (state) => state.local;
export default createConnectLocal(selectLocalState);
```

#### Use the customised connectLocal function to connect comoponent

```js
import connectLocal from './connectLocal';

export default connectLocal(
  (state) => {
    return {
      globalCounter: state.counter
    }
  },
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
```

#### Add local thunk middleware to dispathc actions for local state

```js
import thunk from 'redux-thunk';
import { localThunk } from 'redux-local-state';
import {createStore, applyMiddleware} from 'redux';

const selectLocalState = (state) => state.local;
const store = createStore(reducer, applyMiddleware(thunk, localThunk(selectLocalState)));
```

### Example

`git clone https://github.com/t-benze/redux-local-state.git`

`cd example && npm install && npm start`

