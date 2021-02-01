// Imports from Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory as history } from 'history'
import { reducer as formReducer } from 'redux-form';

// Internal imports (containers, components and reducers)
import employeesReducer from './reducers/employees_reducer';
import clientsReducer from './reducers/clients_reducer';
import EmployeesIndex from './containers/employees_index';
import EmployeesNew from './containers/employees_new';

// Declaring reducers that deal with each key of the Redux State
const reducers = combineReducers({
  employees: employeesReducer,
  clients: clientsReducer,
  form: formReducer
});

// Setting initialState to preload data in first HTTP request
const initialState = {
  //employees: JSON.parse(root.dataset.employees),
  employees: [],
  clients: [],
};

// Middlewares and Store
const middlewares = applyMiddleware(logger, reduxPromise);
const store = createStore(reducers, initialState, middlewares);

// Declaring main HTML element for rendering the application
const root = document.getElementById('root');

// Rendering application to rails view with element with id of root
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={EmployeesIndex} />
        <Route path="/employees/new" component={EmployeesNew} />
      </Switch>
    </Router>
  </Provider>,
  root
);
