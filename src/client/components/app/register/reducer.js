import initialState from '../../../initialState';
import {RegisterActionsConstants} from './constants.js';
const {List} = require('immutable');


const RegisterReducer = (state = initialState.register, action) => {
  switch (action.type) {
    case RegisterActionsConstants.CHANGE_VALUE:
      return state.set(action.payload.name, action.payload.value);
    case RegisterActionsConstants.SET_USER_FREE:
      return state.set('userTaken', false);
    case RegisterActionsConstants.SET_USER_TAKEN:
      return state.set('userTaken', true);
    case RegisterActionsConstants.SET_REGISTRATION_COMPLETE:
      return state.set('error', false).set('completed', true);
    case RegisterActionsConstants.SET_REGISTRATION_FAILED:
      return state.set('error', true);
    case RegisterActionsConstants.SET_COUNTRIES:
      return state.set('countries', new List(action.payload.countries))
    default: //otherwise state is lost!
      return state;
  }
};

export default RegisterReducer
