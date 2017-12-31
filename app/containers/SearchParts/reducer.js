/*
 * HomeReducer
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

import { CHANGE_USERNAME } from './constants';

const selectGlobal = (state) => state.get('global');

// The initial state of the App
const initialState = fromJS({
  search: '',
  part: '',
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return state.set('search', action.name.replace(/@/gi, ''));
    default:
      return state;
  }
}

export default searchReducer;
