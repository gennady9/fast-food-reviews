import {AddRestaurantConstants} from './constants'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import AddRestaurantActions from './actions'

function* addRestaurant(action) {
  const state = yield select();
  const formData = new FormData();
  const location = state['addRestaurant'].get('location');
  formData.append('name', state['addRestaurant'].get('name'));
  formData.append('location', location.label);
  formData.append('lat', location.location.lat);
  formData.append('lng', location.location.lng);
  // formData.append('location', state['register'].get('location'));
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData
      });

    const json = yield call([res, 'json']); //retrieve body of response
    if (json.success) {
      yield put(AddRestaurantActions.clearState());
    } else {
      yield put(AddRestaurantActions.clearState());
    }
  } catch (e) {
    yield put(AddRestaurantActions.clearState());
  }
}

function* AddRestaurantSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(AddRestaurantConstants.ADD_RESTAURANT, addRestaurant);
}

export default AddRestaurantSaga;
