import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter : new Adapter( )});

import clientsReducer from '../clients_reducer';
import { FETCH_CLIENTS } from '../../actions/index';

describe('Clients Reducer Test', () => {
  it('returns initial state if no action type is matched', () => {
    expect(clientsReducer(undefined,{})).toEqual([]);
  });

  it('returns array of clients fetched if receives action type FETCH_CLIENTS', () => {
    const clients = [{client: {id: 1, name: 'test client'}, client_offers:['offer 1 test']}];
    const beforeState = [];
    const action = {
      type: FETCH_CLIENTS, 
      payload: clients
    };
    const afterState = clientsReducer(beforeState, action);

    expect(afterState).toEqual(clients);
  });
});
