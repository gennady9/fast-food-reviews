import initialState from '../../../initialState';
import {ProfilesConstants} from './constants.js';

const ProfilesReducer = (state = initialState.profiles, action) => {
  switch (action.type){
    case ProfilesConstants.CHANGE_VALUE:
      return state.set(action.payload.name, action.payload.value);
    default: //otherwise state is lost!
      return state;
  }
};

export default ProfilesReducer
