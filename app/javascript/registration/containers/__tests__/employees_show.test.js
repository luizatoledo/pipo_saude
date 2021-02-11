import React from "react";
import { EmployeesShow } from '../employees_show';
import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter : new Adapter( )});

describe('Employees Show Connected Component Test', () => {
  it('Renders the name of the specific employee in the title', () => {
    const props = {
      employee: {
        attributes:{
          id:1,
          name:'test employee',
          cpf: '980.315.070-74',
          selected_offers: 'Plano de Saúde Norte Europa',
          client_id: 1,
        }, 
        available_offers:[
          {
            id: 1,
            name:'Plano de Saúde Norte Europa',
            benefit_id: 1,
            partner_id: 1,
            registration_data: [
              "{\"label\":\"Nome\",\"name\":\"name\",\"type\":\"text\"}",
              "{\"label\":\"CPF\",\"name\":\"cpf\",\"type\":\"text\"}",
              "{\"label\":\"Data de Admissão\",\"name\":\"admission_date\",\"type\":\"date\"}",
              "{\"label\":\"E-mail\",\"name\":\"email\",\"type\":\"text\"}"
            ]
          }
        ]
      }
    }

    const wrapper = shallow(<EmployeesShow {...props}/>);

    expect(wrapper.find('h2').text()).toEqual(`Fichas geradas para ${props.employee.attributes.name}`);
    
  });

  it('Only renders the tables for selected options', () => {
    const props = {
      employee: {
        attributes:{
          id:1,
          name:'test employee',
          cpf: '980.315.070-74',
          selected_offers: 'Plano de Saúde Norte Europa',
          client_id: 1,
        }, 
        available_offers:[
          {
            id: 1,
            name:'Plano de Saúde Norte Europa',
            benefit_id: 1,
            partner_id: 1,
            registration_data: [
              "{\"label\":\"Nome\",\"name\":\"name\",\"type\":\"text\"}",
              "{\"label\":\"CPF\",\"name\":\"cpf\",\"type\":\"text\"}",
              "{\"label\":\"Data de Admissão\",\"name\":\"admission_date\",\"type\":\"date\"}",
              "{\"label\":\"E-mail\",\"name\":\"email\",\"type\":\"text\"}"
            ]
          },
          {
            id: 2,
            name: 'Plano Odontológico Dental Sorriso',
            benefit_id: 2,
            partner_id: 2,
            registration_data: [
              "{\"label\":\"Nome\",\"name\":\"name\",\"type\":\"text\"}",
              "{\"label\":\"CPF\",\"name\":\"cpf\",\"type\":\"text\"}",
              "{\"label\":\"Peso (kg)\",\"name\":\"weight\",\"type\":\"number\"}",
              "{\"label\":\"Altura (cm)\",\"name\":\"height\",\"type\":\"number\"}"
            ]
          }
        ]
      }
    }

    const wrapper = shallow(<EmployeesShow {...props}/>);

    expect(wrapper.find('h3').length).toEqual(1);
    expect(wrapper.find('h3').text()).toEqual("Ficha de inclusão Plano de Saúde Norte Europa");
  });
});
