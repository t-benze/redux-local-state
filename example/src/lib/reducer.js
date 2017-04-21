import invariant from 'invariant';
const initialState = {};


import { LOCAL_DISCARD_STORE, LOCAL_DISPATCH_ACTION, LOCAL_REGISTER_STORE } from './actions';

export const getLocalStore = (state, localStoreId) => state.localReducer[localStoreId];

export default function(state = initialState, action) {
    switch (action.type) {
        case LOCAL_REGISTER_STORE:
            const initState = action.reducer(undefined, {});
            invariant(initState, `Reducer for local store "${action.id}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.`);
            return {
                ...state,
                [action.id]: {
                    reducer: action.reducer,
                    state: initState,
                }
            }
        case LOCAL_DISPATCH_ACTION:
            const localStore = state[action.id];
            const newLocalState = localStore.reducer(localStore.state, action.localAction);
            return {
                ...state,
                [action.id]: {
                    reducer: localStore.reducer,
                    state: newLocalState
                }
            };
        case LOCAL_DISCARD_STORE:
            return {
                ...state,
                [action.id]: undefined
            }
        default:
            return state;
    }
}