import {RegisterActionsConstants} from './constants.js';
import {LoginActionsConstants} from "./constants";

function changeValue(name, value) {
  return {
    type: LoginActionsConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}

function loginUser() {
  return {
    type: LoginActionsConstants.LOGIN_USER,
    uri: '/api/login'
  }
}

function setLoginComplete() {
  return {
    type: LoginActionsConstants.SET_LOGIN_COMPLETE,
  }
}

function setLoginFailed() {
  return {
    type: LoginActionsConstants.SET_LOGIN_FAILED,
  }
}

const RegisterActions = {
  changeValue,
  setLoginComplete,
  setLoginFailed,
  loginUser,
};

export default RegisterActions;
