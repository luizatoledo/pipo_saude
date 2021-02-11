import React from "react";
import { screen, render } from "@testing-library/react";
import { createStore } from "redux";
import { EmployeesIndex } from '../employees_index';
import { Provider } from 'react-redux';
import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter : new Adapter( )});

describe('Employees Index Connected Component Test', () => {
  it('renders header and doesnt render list without one', () => {
    const props = {
      fetchEmployees: jest.fn(),
      employees: []
    }

    const wrapper = shallow(<EmployeesIndex {...props}/>);

    expect(wrapper.find('h3').text()).toEqual("Lista de Beneficiários");
    expect(wrapper.exists('.employee-item')).toEqual(false);
  });

  it('renders list when provided one', () => {
    const props = {
      fetchEmployees: jest.fn(),
      employees: [{attributes:{id:1, name: 'test employee', cpf: '980.315.070-74'}, selected_offers:["offer 1", "offer 2"]}]
    }

    const wrapper = shallow(<EmployeesIndex {...props}/>);
    
    expect(wrapper.exists('.employee-item')).toEqual(true);
    expect(wrapper.find('.employee-item-name').text()).toEqual(`1. ${props.employees[0].attributes.name}`);
  });

});
