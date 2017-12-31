/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectPart = (state) => state.get('part');

const makeSelectParts = () =>
  createSelector(selectPart, (homeState) => homeState.get('slideMenuOpen'));

export { selectPart, makeSelectParts };
