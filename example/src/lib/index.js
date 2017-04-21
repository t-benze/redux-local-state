
import connectLocal from './connectLocal';
import localReducer, {getLocalStore} from './reducer';
import { dispatchLocalAction } from './actions';

export {
    localReducer,
    dispatchLocalAction,
    getLocalStore
}
export default connectLocal;
