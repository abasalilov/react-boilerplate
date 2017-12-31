/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import pd from 'pdvindecoder/lib';

import {
  CHANGE_VIN,
  SET_SLIDE_MENU,
  LOAD_DECODE_SUCCESS,
  LOAD_DECODE_ERROR,
  LOAD_DECODED,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_VIN
 * @return {object}    An action object with a type of SET_SLIDE_MENU
 */
export function changeVin(vin) {
  console.log('here', vin);
  return {
    type: CHANGE_VIN,
    vin,
  };
}

export function setSlideMenu(bool) {
  return {
    type: SET_SLIDE_MENU,
    bool,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {function} pd decoder
 * @param  {string} vin  vin decoded
 *
 * @return {object}      An action object with a type of LOAD_DECODE_SUCCESS passing the repos
 */
export function decodeSuccessful(data) {
  return {
    type: LOAD_DECODE_SUCCESS,
    data,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_DECODE_ERROR passing the error
 */
export function decodeError(error) {
  return {
    type: LOAD_DECODE_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_DECODED
 */
export function loadDecoded(data) {
  return {
    type: LOAD_DECODED,
    data,
  };
}
