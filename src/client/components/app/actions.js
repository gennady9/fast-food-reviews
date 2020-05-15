import {AppActionsConstants} from './constants.js';

function setRequireAuth() {
  return {
    type: AppActionsConstants.SET_REQUIRE_AUTH,
  }
}

function setUsernameAuth(username, userId) {
  return {
    type: AppActionsConstants.SET_USERNAME_AUTH,
    payload: {
      username,
      userId
    }
  }
}

function loadUsernameAuth() {
  return {
    type: AppActionsConstants.LOAD_USERNAME_AUTH,
    uri: '/api/checkToken'
  }
}

function logout() {
  return {
    type: AppActionsConstants.LOGOUT,
    uri: '/api/logout'
  }
}

let AppActions = {
  setRequireAuth,
  setUsernameAuth,
  loadUsernameAuth,
  logout
};

export default AppActions;
