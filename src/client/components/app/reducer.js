import initialState from '../../initialState';
import {AppActionsConstants} from './constants.js';

const AppReducer = (state = initialState.app, action) => {
  switch (action.type) {
    case AppActionsConstants.SET_REQUIRE_AUTH:
      return state.set('requireAuth', true).set('username', '').set('loading', false);
    case AppActionsConstants.SET_USERNAME_AUTH: {
      return state.set('requireAuth', false).set('username', action.payload.username).set('userId', action.payload.userId).set('loading', false);
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default AppReducer
