import initialState from '../../../initialState';
import {ProfileConstants} from './constants.js';

const ProfileReducer = (state = initialState.profile, action) => {
  switch (action.type){
    case ProfileConstants.CHANGE_VALUE:
      return state.set(action.payload.name, action.payload.value);
    default: //otherwise state is lost!
      return state;
  }
};

export default ProfileReducer
