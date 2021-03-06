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
import selectedOffersReducer from './reducers/selected_offers_reducer';
import EmployeesIndex from './containers/employees_index';
import EmployeesNew from './containers/employees_new';
import EmployeesShow from './containers/employees_show';

// Declaring reducers that deal with each key of the Redux State
const reducers = combineReducers({
  employees: employeesReducer,
  clients: clientsReducer,
  selectedOffers: selectedOffersReducer,
  form: formReducer
});

// Declaring main HTML element for rendering the application
const root = document.getElementById('root');

// Setting initialState to preload data in first HTTP request
const initialState = {
  employees: JSON.parse(root.dataset.employees),
  clients: [],
  selectedOffers: [],
};

// Middlewares and Store
const middlewares = applyMiddleware(logger, reduxPromise);
const store = createStore(reducers, initialState, middlewares);


// Rendering application to rails view with element with id of root
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={EmployeesIndex} />
        <Route path="/employees/new" component={EmployeesNew} />
        <Route path="/employees/:id" component={EmployeesShow} />
      </Switch>
    </Router>
  </Provider>,
  root
);
