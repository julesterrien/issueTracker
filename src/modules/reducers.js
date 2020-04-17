/*
  novux is a reducer factory pattern I wrote/open sourced
  https://www.npmjs.com/package/novux
*/
import { createReducer } from 'novux';
import { reducer as formReducer } from 'redux-form'
import { PATHS } from './paths';

export const MAIN_REDUCER = 'main';
export const ROUTER_REDUCER = 'router';
export const FORM_REDUCER = 'form';

const mainReducer = createReducer(MAIN_REDUCER, {});
const routerReducer = createReducer(ROUTER_REDUCER, {
  location: PATHS.signIn,
});

const reducers = {
  [MAIN_REDUCER]: mainReducer,
  [FORM_REDUCER]: formReducer,
  [ROUTER_REDUCER]: routerReducer,
};

export default reducers;
