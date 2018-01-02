/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SEARCH = 'boilerplate/PartsDetectHome/SEARCH';
export const SET_SLIDE_MENU = 'boilerplate/PartsDetectHome/SET_SLIDE_MENU';
export const LOAD_DECODE_SUCCESS = 'boilerplate/App/LOAD_DECODE_SUCCESS';
export const LOAD_DECODE_ERROR = 'boilerplate/App/LOAD_DECODE_ERROR';
export const LOAD_DECODED = 'boilerplate/App/LOAD_DECODED';
export const CHANGE_VIN = 'boilerplate/App/CHANGE_VIN';

