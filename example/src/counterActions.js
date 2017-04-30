
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const RESET_COUNTER = 'RESET_COUNTER';

export function incrementCounter() {
    return {
        type: INCREMENT_COUNTER
    };
}

export function incrementCounterAsync() {
    return function (dispatch, getState) {
        setTimeout(() => { 
            if(getState().counter >= 5) {
                dispatch({
                    type: RESET_COUNTER
                });
            } else {
                dispatch({
                    type: INCREMENT_COUNTER
                })
            }
        }, 500);
    }
}