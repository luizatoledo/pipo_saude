// export const of action types
export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const FETCH_CLIENTS = 'FETCH_CLIENTS';
export const SELECTED_OFFERS = 'SELECTED_OFFERS';

// Actions that use Employee API
export function fetchEmployees() {
  const promise = fetch('/api/v1/employees').then(response => response.json());

  return {
    type: FETCH_EMPLOYEES,
    payload: promise
  };
}

export function createEmployee(info, callback) {
  const request = fetch('/api/v1/employees', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
  }).then(response => response.json())
    .then(callback);

  return {
    type: CREATE_EMPLOYEE,
    payload: request
  };
}

// Actions that use Clients API
export function fetchClients() {
  const promise = fetch('/api/v1/clients').then(response => response.json());
  return {
    type: FETCH_CLIENTS,
    payload: promise
  }
}

// Action that sends to Redux Store the selected offers for the new employee
export function selectOffers(offers) {
  return {
    type: SELECTED_OFFERS,
    payload: offers ? offers : []
  };
}