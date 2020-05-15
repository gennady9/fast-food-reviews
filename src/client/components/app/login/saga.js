import {LoginActionsConstants} from './constants'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import LoginActions from './actions'

function* loginUser(action) {
  const state = yield select();

  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: JSON.stringify(state['login'].toJS()),
        headers: {
          'Content-Type': 'application/json'
        }
      });

    const json = yield call([res, 'json']); //retrieve body of response
    if (json.success) {
      yield put(LoginActions.setLoginComplete());
    } else {
      yield put(LoginActions.setLoginFailed());
    }
  } catch (e) {
    yield put(LoginActions.setLoginFailed());
  }
}

function* LoginSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(LoginActionsConstants.LOGIN_USER, loginUser);

}

export default LoginSaga;
