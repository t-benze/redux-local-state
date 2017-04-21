


export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export function incrementCounter() {
    return {
        type: INCREMENT_COUNTER
    };
}

export function incrementCounterAsync() {
    return function (dispatch, getState) {
        setTimeout(() => {
            dispatch({
                type: INCREMENT_COUNTER
            })
        }, 500);
    }
}