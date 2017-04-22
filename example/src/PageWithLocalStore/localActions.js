export const INCREMENT_LOCAL_COUNTER = 'INCREMENT_LOCAL_COUNTER';
export const SET_LOCAL_COUNTER = 'SET_LOCAL_COUNTER';

import { dispatchLocalAction, getLocalStore } from '../lib';


export function incrementLocalCounter(localStoreId) {
    return dispatchLocalAction(localStoreId, {
        type: INCREMENT_LOCAL_COUNTER
    });
}

export function incrementLocalCounterAsync(localStoreId) {
    return function (dispatch, getState) {
        setTimeout(() => {
            dispatch(dispatchLocalAction(localStoreId, {
                type: INCREMENT_LOCAL_COUNTER
            }));
        }, 500);
    }
}


// export function incrementLocalCounter(localStoreId) {
//     return dispatchLocalAction(localStoreId, {
//         type: INCREMENT_LOCAL_COUNTER
//     });
// }

// export function incrementLocalCounterAsync(localStoreId) {
//     return function (dispatch, getState) {
//         setTimeout(() => {
//             dispatch(dispatchLocalAction(localStoreId, {
//                 type: INCREMENT_LOCAL_COUNTER
//             }));
//         }, 500);
//     }
// }