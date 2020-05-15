import {RestaurantConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import RestaurantActions from './actions'
import {fromJS} from 'immutable';

function* loadRestaurant(action) {
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    const json = yield call([res, 'json']); //retrieve body of response
    yield put(RestaurantActions.changeValue('name', json.name));
    yield put(RestaurantActions.changeValue('location', json.location));
    yield put(RestaurantActions.changeValue('id', action.payload.id));
    yield put(RestaurantActions.changeValue('reviews', fromJS(json.reviews)));
    yield put(RestaurantActions.changeValue('isAddReviewShown', false));
    // } else {
    //   yield put(RegisterActions.setUsernameFree());
    // }
  } catch (e) {
    // yield put(RegisterActions.setUsernameTaken());
  }
}

function* RestaurantSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(RestaurantConstants.LOAD_RESTAURANT, loadRestaurant);
}

export default RestaurantSaga;
