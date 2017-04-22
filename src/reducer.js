const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOCAL_REGISTER_STORE:
            return {
                ...state,
                [action.id]: {
                    reducer: action.reducer,
                    state: action.reducer(undefined, {}),
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
        case LOCAL_DISCARD_STORE:
            return {
              ...state,
              [action.id]: undefined
            }
        default:
            return state;
    }
}