/**
 * Created by tangbz on 3/8/17.
 */

// @flow


export const LOCAL_REGISTER_STATE = '$LOCAL_REGISTER_STATE';
export const LOCAL_DISCARD_STATE = '$LOCAL_DISCARD_STATE';
export const LOCAL_DISPATCH_ACTION = '$LOCAL_DISPATCH_ACTION';

export function registerLocalState(id, reducer) {
    return {
        type: LOCAL_REGISTER_STATE,
        id,
        reducer
    }
}

export function discardLocalState(id) {
    return {
        type: LOCAL_DISCARD_STATE,
        id
    }
}

export function dispatchLocalAction(id, localAction) {
    return {
        type: LOCAL_DISPATCH_ACTION,
        id,
        localAction
    }
}
