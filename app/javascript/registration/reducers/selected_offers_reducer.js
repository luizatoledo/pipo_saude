import { SELECTED_OFFERS } from '../actions';

export default function selectedOffersReducer(state = [], action) {
  switch (action.type) {
    case SELECTED_OFFERS:
      return action.payload;
    default:
      return state;
  }
}
