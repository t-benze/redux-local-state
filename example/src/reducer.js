import counter from './counterReducer';
import {reducer as local} from 'redux-local-state';

export const selectLocalState = (state) => state.local;

export default {
    counter,
    local
}