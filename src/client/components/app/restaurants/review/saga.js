import {ReviewConstants} from './constants'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import ReviewActions from './actions'

function* addReview(action) {
  const state = yield select();
  const formData = new FormData();
  formData.append('user', state['app'].get('username'));
  formData.append('bathroomQuality', state['review'].get('bathroomQuality'));
  formData.append('staffKindness', state['review'].get('staffKindness'));
  formData.append('cleanliness', state['review'].get('cleanliness'));
  formData.append('driveThruQuality', state['review'].get('driveThruQuality'));
  formData.append('deliverySpeed', state['review'].get('deliverySpeed'));
  formData.append('foodQuality', state['review'].get('foodQuality'));
  formData.append('restaurant', action.payload.restaurantId);
  formData.append('picture', state['review'].get('picture'));
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData
      });

    const json = yield call([res, 'json']); //retrieve body of response
    if (json.success) {
      yield put(ReviewActions.clearState());
    } else {
      yield put(ReviewActions.clearState());
    }
  } catch (e) {
    yield put(ReviewActions.clearState());
  }
}

function* editReview(action) {
  const state = yield select();
  const formData = new FormData();
  formData.append('bathroomQuality', state['review'].get('bathroomQuality'));
  formData.append('staffKindness', state['review'].get('staffKindness'));
  formData.append('cleanliness', state['review'].get('cleanliness'));
  formData.append('driveThruQuality', state['review'].get('driveThruQuality'));
  formData.append('deliverySpeed', state['review'].get('deliverySpeed'));
  formData.append('foodQuality', state['review'].get('foodQuality'));
  formData.append('reviewId', action.payload.reviewId);
  formData.append('picture', state['review'].get('picture'));
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData
      });

    const json = yield call([res, 'json']); //retrieve body of response
    if (json.success) {
      yield put(ReviewActions.clearState());
    } else {
      yield put(ReviewActions.clearState());
    }
  } catch (e) {
    yield put(ReviewActions.clearState());
  }
}

function* ReviewSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(ReviewConstants.ADD_REVIEW, addReview);
  yield takeEvery(ReviewConstants.EDIT_REVIEW, editReview);
}

export default ReviewSaga;
