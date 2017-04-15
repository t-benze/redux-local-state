import { INCREMENT_LOCAL_COUNTER } from './localActions';
const initialState = {
    counter: 0,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case INCREMENT_LOCAL_COUNTER:
            return {
                ...state,
                counter: state.counter + 1
            };
    }
}