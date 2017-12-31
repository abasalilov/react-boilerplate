/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectVin = () =>
  createSelector(selectHome, (homeState) => homeState.get('vin'));

const makeGetSearch = () =>
  createSelector(selectHome, (homeState) => homeState.get('search'));

const makeSelectSlideMenu = () =>
  createSelector(selectHome, (homeState) => homeState.get('slideMenuOpen'));

export { selectHome, makeSelectVin, makeSelectSlideMenu, makeGetSearch };
