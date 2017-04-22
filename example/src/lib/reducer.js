import invariant from 'invariant';
const initialState = {};


import { LOCAL_DISCARD_STATE, LOCAL_DISPATCH_ACTION, LOCAL_REGISTER_STATE } from './actions';

export const getLocalState = (state, localStateId) => state.localReducer[localStateId];

export default function(state = initialState, action) {
    switch (action.type) {
        case LOCAL_REGISTER_STATE:
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
            const localState = state[action.id];
            const newLocalState = localState.reducer(localState.state, action.localAction);
            return {
                ...state,
                [action.id]: {
                    reducer: localState.reducer,
                    state: newLocalState
                }
            };
        case LOCAL_DISCARD_STATE:
            return {
                ...state,
                [action.id]: undefined
            }
        default:
            return state;
    }
}