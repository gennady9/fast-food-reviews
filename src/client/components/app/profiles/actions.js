import { ProfilesConstants} from './constants.js';

function changeValue(name, value) {
  return {
    type: ProfilesConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}

function searchUsers() {
  return {
    type: ProfilesConstants.SEARCH_USERS,
    uri: '/api/users/search'
  }
}

let ProfilesActions  = {
  changeValue,
  searchUsers
};

export default ProfilesActions;
