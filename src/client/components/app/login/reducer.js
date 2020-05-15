import initialState from '../../../initialState';
import {LoginActionsConstants} from './constants.js';

const RegisterReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case LoginActionsConstants.CHANGE_VALUE:
      return state.set(action.payload.name, action.payload.value);
    case LoginActionsConstants.SET_LOGIN_COMPLETE:
      return state.set('error', false).set('completed', true);
    case LoginActionsConstants.SET_LOGIN_FAILED:
      return state.set('error', true);
    default: //otherwise state is lost!
      return state;
  }
};

export default RegisterReducer
