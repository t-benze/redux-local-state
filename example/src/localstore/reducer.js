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