/**
 * Created by tangbz on 3/8/17.
 */

// @flow


export const LOCAL_REGISTER_STORE = '$LOCAL_REGISTER_STORE';
export const LOCAL_DISCARD_STORE = '$LOCAL_DISCARD_STORE';
export const LOCAL_DISPATCH_ACTION = '$LOCAL_DISPATCH_ACTION';

export function registerLocalStore(id, reducer) {
    return {
        type: LOCAL_REGISTER_STORE,
        id,
        reducer
    }
}

export function discardLocalStore(id) {
    return {
        type: LOCAL_DISCARD_STORE,
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
