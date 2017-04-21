import { localReducer } from './lib';
import { INCREMENT_COUNTER } from './actions';

const initialCounterState = 0;

function counter(state = initialCounterState, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return state + 1;
        default:
            return state;
    }
}

export default {
    counter,
    localReducer
};