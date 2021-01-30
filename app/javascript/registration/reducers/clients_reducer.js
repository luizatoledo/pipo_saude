import { FETCH_CLIENTS, FETCH_CLIENT } from '../actions';

export default function clientsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_CLIENTS:
      return action.payload;
    case FETCH_CLIENT:
      return action.payload;
    default:
      return state;
  }
}
