import {ProfilesConstants} from './constants'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import {fromJS, List} from 'immutable';
import ProfilesActions from './actions'

function* searchUsers(action) {
  const state = yield select();
  const formData = new FormData();
  formData.append('name', state['profiles'].get('searchUser'));
  formData.append('location', state['profiles'].get('searchLocation'));
  formData.append('nameEnabled', state['profiles'].get('searchNameEnabled'));
  formData.append('locationEnabled', state['profiles'].get('searchLocationEnabled'));
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData
      });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(ProfilesActions.changeValue('users', fromJS(json.users)));
  } catch (e) {
    yield put(ProfilesActions.changeValue('users', List()));
  }
}

function* ProfilesSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(ProfilesConstants.SEARCH_USERS, searchUsers);
}

export default ProfilesSaga;
