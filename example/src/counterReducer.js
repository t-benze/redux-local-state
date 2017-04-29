import { INCREMENT_COUNTER, RESET_COUNTER } from "./counterActions";

const initialCounterState = 0;

export default function(state = initialCounterState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case RESET_COUNTER:
      return 0;
    default:
      return state;
  }
}
