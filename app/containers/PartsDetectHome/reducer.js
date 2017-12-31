/*
 * pdHomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import appReducer from '../App/reducer';
import { CHANGE_VIN, SET_SLIDE_MENU, LOAD_DECODED } from './constants';

// The initial state of the App
const initialState = fromJS({
  vin: '',
  slideMenuOpen: false,
  vinData: '',
});

function pdHomeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VIN:
      console.log('action', action);
      // Delete prefixed '@' from the github username
      return state.set('vin', action.vin);
    case SET_SLIDE_MENU:
      return state.set('slideMenuOpen', action.bool);
    case LOAD_DECODED:
      return state.set('vinData', action.data);
    default:
      return state;
  }
}

export default pdHomeReducer;
