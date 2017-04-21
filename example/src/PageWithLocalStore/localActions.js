export const INCREMENT_LOCAL_COUNTER = 'INCREMENT_LOCAL_COUNTER';
export const SET_LOCAL_COUNTER = 'SET_LOCAL_COUNTER';

import { dispatchLocalAction, getLocalStore } from '../lib';

export function incrementLocalCounter() {
    return {
        type: INCREMENT_LOCAL_COUNTER
    };
}

export function setLocalCounter(count) {
    return {
        type: SET_LOCAL_COUNTER,
        count: count
    };
}

export function adapter(localStoreId, internalAction) {
    return function (dispatch, getState) {
        const thunk = internalAction();
        thunk((action) => {
            dispatch(dispatchLocalAction(localStoreId, action))
        }, () => getLocalStore(getState(), localStoreId));
    }
}

// export function incrementLocalCounterAsync(localStoreId, byNumber = 2) {
//     // const internalAction = () => incrementLocalCounterInternal(byNumber);
//     return adapter(localStoreId, () => {
//         return incrementLocalCounterInternal(byNumber);
//     });
// }

export function incrementLocalCounterAsync(byNumber) {
    return function (dispatch, getState) {
        setTimeout(() => {
            const localState = getState();
            dispatch(setLocalCounter(10 * byNumber));
        }, 500);
    }
}