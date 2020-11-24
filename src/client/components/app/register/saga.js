import {RegisterActionsConstants} from './constants'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import RegisterActions from './actions'

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
      yield put(RegisterActions.setUsernameTaken());
    } else {
      yield put(RegisterActions.setUsernameFree());
    }
  } catch (e) {
    yield put(RegisterActions.setUsernameTaken());
  }
}

function* registerUser(action) {
  const state = yield select();
  const formData = new FormData();
  const location = state['register'].get('location');
  formData.append('username', state['register'].get('username'));
  formData.append('password', state['register'].get('password'));
  formData.append('location', location.label);
  formData.append('lat', location.location.lat);
  formData.append('lng', location.location.lng);

  // version without google maps api
  // formData.append('location', state['register'].get('location'));
  // formData.append('lat', 0);
  // formData.append('lng', 0);
  // version without google maps api

  formData.append('picture', state['register'].get('picture'));
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData
      });

    const json = yield call([res, 'json']); //retrieve body of response
    if (json.success) {
      yield put(RegisterActions.setRegistrationComplete());
    } else {
      yield put(RegisterActions.setRegistrationFailed());
    }
  } catch (e) {
    yield put(RegisterActions.setRegistrationFailed());
  }
}

function* RegisterSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(RegisterActionsConstants.CHECK_USER_EXISTS, userExists);
  yield takeEvery(RegisterActionsConstants.REGISTER_USER, registerUser);
}

export default RegisterSaga;
