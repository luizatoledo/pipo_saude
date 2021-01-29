import { FETCH_EMPLOYEES, FETCH_EMPLOYEE, CREATE_EMPLOYEE } from '../actions';

export default function employeesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return action.payload;
    case FETCH_EMPLOYEE:
      return [ action.payload ];
    default:
      return state;
  }
}
