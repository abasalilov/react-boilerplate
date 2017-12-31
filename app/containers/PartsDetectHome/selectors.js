/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectVin = () =>
  createSelector(selectHome, (homeState) => homeState.get('vin'));

const makeSelectVinData = () =>
  createSelector(selectHome, (homeState) => homeState.get('vinData'));

const makeSelectSlideMenu = () =>
  createSelector(selectHome, (homeState) => homeState.get('slideMenuOpen'));

export { selectHome, makeSelectVin, makeSelectSlideMenu, makeSelectVinData };
