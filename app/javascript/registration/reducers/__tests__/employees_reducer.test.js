import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter : new Adapter( )});

import employeesReducer from '../employees_reducer';
import { FETCH_EMPLOYEES } from '../../actions/index';

describe('Employees Reducer Test', () => {
  it('returns initial state if no action type is matched', () => {
    expect(employeesReducer(undefined,{})).toEqual([]);
  });

  it('returns array of employees fetched if receives action type FETCH_employees', () => {
    const employees = [{attributes: {id: 1, name: 'test employee', cpf: '276.367.350-32'}, selected_offers: ["offer 1", "offer 2"]}];
    const beforeState = [];
    const action = {
      type: FETCH_EMPLOYEES, 
      payload: employees
    };
    const afterState = employeesReducer(beforeState, action);

    expect(afterState).toEqual(employees);
  });
});