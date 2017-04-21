import { INCREMENT_LOCAL_COUNTER, SET_LOCAL_COUNTER } from './localActions';
const initialState = {
    counter: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case INCREMENT_LOCAL_COUNTER:
            return {
                ...state,
                counter: state.counter + 1
            };
        case SET_LOCAL_COUNTER:
            return {
                ...state,
                counter: action.count
            }
        default:
            return state;
    }
}