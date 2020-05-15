import {ReviewConstants} from './constants.js';

function changeValue(name, value) {
  return {
    type: ReviewConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}

function clearState() {
  return {
    type: ReviewConstants.CLEAR_STATE,
  }
}

function addReview(restaurantId) {
  return {
    type: ReviewConstants.ADD_REVIEW,
    uri: '/api/restaurant/review',
    payload: {restaurantId}
  }
}

function editReview(reviewId) {
  return {
    type: ReviewConstants.EDIT_REVIEW,
    uri: '/api/review/edit',
    payload: {reviewId}
  }
}

let ReviewActions = {
  changeValue,
  clearState,
  addReview,
  editReview
};

export default ReviewActions;
