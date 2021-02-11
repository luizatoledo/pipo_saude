import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter : new Adapter( )});

import selectedOffersReducer from '../selected_offers_reducer';
import { SELECTED_OFFERS } from '../../actions/index';

describe('Selected Offers Reducer Test', () => {
  it('returns initial state if no action type is matched', () => {
    expect(selectedOffersReducer(undefined,{})).toEqual([]);
  });

  it('returns array of offers if receives action type SELECTED_OFFERS', () => {
    const selected_offers = [{id: 1, name: 'offer 1'}, {id: 2, name: 'offer 2'}];
    const beforeState = [];
    const action = {
      type: SELECTED_OFFERS, 
      payload: selected_offers
    };
    const afterState = selectedOffersReducer(beforeState, action);

    expect(afterState).toEqual(selected_offers);
  });
});