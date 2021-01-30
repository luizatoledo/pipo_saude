import { FETCH_PARTNERS } from '../actions';

export default function partnersReducer(state = [], action) {
  switch (action.type) {
    case FETCH_PARTNERS:
      return action.payload;
    default:
      return state;
  }
}
