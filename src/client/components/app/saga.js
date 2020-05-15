import {AppActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import AppActions from './actions'

function* loadUsernameAuth(action) {
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

    const json = yield call([res, 'json']); //retrieve body of response
    if (json.username) {
      yield put(AppActions.setUsernameAuth(json.username, json.userId));
    } else {
      yield put(AppActions.setRequireAuth());
    }
  } catch (e) {
    yield put(AppActions.setRequireAuth());
  }
}

function* logout(action) {
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(AppActions.setRequireAuth());
  } catch (e) {
    yield put(AppActions.setRequireAuth());
  }
}

function* AppSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(AppActionsConstants.LOAD_USERNAME_AUTH, loadUsernameAuth);
  yield takeEvery(AppActionsConstants.LOGOUT, logout);
}

export default AppSaga;
