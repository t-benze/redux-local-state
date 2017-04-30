import {LOCAL_DISPATCH_ACTION, dispatchLocalAction} from './actions';

export default function(selectLocalState, extraArgs) {
  return ({ dispatch, getState }) => next => action => {
    if (action.type === LOCAL_DISPATCH_ACTION) {
        if(typeof action.localAction === "function") {
            const localStateId = action.id;
            const localDispatch = (action) => {
                return dispatch(dispatchLocalAction(localStateId, action));
            }
            const localGetState = () => selectLocalState(getState())[localStateId].state;
            action.localAction(localDispatch, localGetState, dispatch, getState);
        } else {
            return next(action);
        }
    }
    return next(action);
  };
}