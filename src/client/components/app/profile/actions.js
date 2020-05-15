import { ProfileConstants} from './constants.js';

function changeValue(name, value) {
  return {
    type: ProfileConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}

function loadUserData(userId) {
  return {
    type: ProfileConstants.LOAD_USER_DATA,
    uri: `/api/user?userId=${userId}`
  }
}

function deleteReview(reviewId) {
  return {
    type: ProfileConstants.DELETE_REVIEW,
    uri: `/api/review/delete?id=${reviewId}`
  }
}

function updateName() {
  return {
    type: ProfileConstants.UPDATE_NAME,
    uri: '/api/user/name',
  }
}

function updateLocation() {
  return {
    type: ProfileConstants.UPDATE_LOCATION,
    uri: '/api/user/location',
  }
}

function checkUserExists(username) {
  return {
    type: ProfileConstants.CHECK_USER_EXISTS,
    uri: `/api/exists?username=${username}`
  }
}

let ProfileActions  = {
  changeValue,
  loadUserData,
  deleteReview,
  updateName,
  updateLocation,
  checkUserExists
};

export default ProfileActions;
