import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter : new Adapter( )});

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureStore();

import EmployeesIndex from '../employees_index';

describe('Employees Index Container Test', () => {

  it('should render a placeholder', () => {
    const wrapper = shallow(
      <Provider store={mockStore({employees:[]})}>
        <EmployeesIndex />
      </Provider>
      );
    expect(wrapper.find('.btn-pipo').exists()).toBe(true);
    // expect(wrapper.find('.employee-item').exists()).toBe(false);
  });

  // it('should render actual employee information', () => {
  //   const wrapper = shallow(<EmployeesIndex employees=[]);
  //   expect(wrapper.find('.dog-placeholder').exists()).toBe(false);
  //   expect(wrapper.find('img[src="http://somedogurl.dog"]').exists()).toBe(true);
  // });

});