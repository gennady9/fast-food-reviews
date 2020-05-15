import {RegisterActionsConstants} from './constants.js';

function changeValue(name, value) {
  return {
    type: RegisterActionsConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}

//
function checkUserExists(username) {
  return {
    type: RegisterActionsConstants.CHECK_USER_EXISTS,
    uri: `/api/exists?username=${username}`
  }
}

function setUsernameTaken() {
  return {
    type: RegisterActionsConstants.SET_USER_TAKEN
  }
}

function setUsernameFree() {
  return {
    type: RegisterActionsConstants.SET_USER_FREE
  }
}

function registerUser() {
  return {
    type: RegisterActionsConstants.REGISTER_USER,
    uri: '/api/register'
  }
}

function setRegistrationComplete() {
  return {
    type: RegisterActionsConstants.SET_REGISTRATION_COMPLETE,
  }
}

function setRegistrationFailed() {
  return {
    type: RegisterActionsConstants.SET_REGISTRATION_FAILED,
  }
}

const RegisterActions = {
  changeValue,
  checkUserExists,
  setUsernameFree,
  setUsernameTaken,
  setRegistrationComplete,
  setRegistrationFailed,
  registerUser
};

export default RegisterActions;
