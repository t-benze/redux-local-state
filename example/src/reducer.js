import {localReducer} from 'redux-local-store';
import {INCREMENT_COUNTER} from './actions';


const initialCounterState = 0;

function counter(state = initialState, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
        return state + 1;
    }
}

export default {
    counter,
    localReducer
};