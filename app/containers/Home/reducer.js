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

import { SET_SLIDE_MENU, LOAD_DECODED, SET_SEARCH } from './constants';

// The initial state of the App
const initialState = fromJS({
  search: '',
  slideMenuOpen: false,
  vinData: '',
});

function pdHomeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      // Delete prefixed '@' from the github username
      return state.set('search', action.search);
    case SET_SLIDE_MENU:
      return state.set('slideMenuOpen', action.bool);
    case LOAD_DECODED:
      return state.set('vinData', action.data);
    default:
      return state;
  }
}

export default pdHomeReducer;
