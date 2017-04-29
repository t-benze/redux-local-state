import {createConnectLocal} from 'redux-local-state';
import {selectLocalState} from './reducer';
export default createConnectLocal(selectLocalState);