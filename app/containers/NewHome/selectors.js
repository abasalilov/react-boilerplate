/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

export const selectHome = (state) => state.get('home');

export const makeSelectVin = () =>
  createSelector(selectHome, (homeState) => homeState.get('vin'));

// export const makeSelectVinData = () =>
//   createSelector(selectHome, (homeState) => homeState.get('vinData'));

// export const makeSelectSlideMenu = () =>
//   createSelector(selectHome, (homeState) => homeState.get('slideMenuOpen'));
