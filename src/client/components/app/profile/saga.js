import {ProfileConstants} from './constants'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import {fromJS, Map} from 'immutable';
import ProfileActions from './actions'
import RegisterActions from "../register/actions";

function* loadUserData(action) {
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    const json = yield call([res, 'json']); //retrieve body of response
    yield put(ProfileActions.changeValue('name', json.name));
    yield put(ProfileActions.changeValue('location', json.location));
    yield put(ProfileActions.changeValue('picture', fromJS(json.picture)));
    yield put(ProfileActions.changeValue('reviews', fromJS(json.reviews)));
    yield put(ProfileActions.changeValue('isEditReviewShown', false));
    yield put(ProfileActions.changeValue('editReview', Map({})));

  } catch (e) {
  }
}

function* deleteReview(action) {
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    const json = yield call([res, 'json']); //retrieve body of response
    yield put(ProfileActions.changeValue('reviews', fromJS(json.reviews)));
    yield put(ProfileActions.changeValue('isEditReviewShown', false));
    yield put(ProfileActions.changeValue('editReview', Map({})));
  } catch (e) {
  }
}

function* updateName(action) {
  const state = yield select();
  const formData = new FormData();
  const name = state['profile'].get('updateName');
  formData.append('name', name);

  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData
      });

    const json = yield call([res, 'json']);
    // yield put(AppActions.setUsernameAuth(action.payload.name, json.id));
    // yield put(ProfileActions.changeValue('name', ''));
  } catch (e) {
  }
}

function* updateLocation(action) {
  const state = yield select();
  const location = state['profile'].get('updateLocation');
  const formData = new FormData();
  formData.append('location', location.label);
  formData.append('lat', location.location.lat);
  formData.append('lng', location.location.lng);

  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData
      });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(ProfileActions.changeValue('location', location.label));
  } catch (e) {
  }
}

function* userExists(action) {
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

    const json = yield call([res, 'json']); //retrieve body of response
    if (json.exists) {
      yield put(ProfileActions.changeValue('userTaken', true));
    } else {
      yield put(ProfileActions.changeValue('userTaken', false));
    }
  } catch (e) {
  }
}

function* ProfileSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(ProfileConstants.LOAD_USER_DATA, loadUserData);
  yield takeEvery(ProfileConstants.DELETE_REVIEW, deleteReview);
  yield takeEvery(ProfileConstants.UPDATE_LOCATION, updateLocation);
  yield takeEvery(ProfileConstants.UPDATE_NAME, updateName);
  yield takeEvery(ProfileConstants.CHECK_USER_EXISTS, userExists);
}

export default ProfileSaga;
