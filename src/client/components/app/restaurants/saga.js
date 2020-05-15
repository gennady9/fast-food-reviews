import {RestaurantsConstants} from './constants'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import {fromJS, List} from 'immutable';
import RestaurantsActions from './actions'

function* loadRestaurants(action) {
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(RestaurantsActions.setRestaurantList(fromJS(json.restaurants)));
  } catch (e) {
    yield put(RestaurantsActions.setRestaurantList(List()));
  }
}

function* basicSearch(action) {
  const state = yield select();
  const formData = new FormData();
  formData.append('name', state['restaurants'].get('basicSearchName'));
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData
      });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(RestaurantsActions.changeValue('searchResults', fromJS(json.restaurants)));
  } catch (e) {
    yield put(RestaurantsActions.changeValue('searchResults', List()));
  }
}

function* advancedSearch(action) {
  const state = yield select();
  const formData = new FormData();
  formData.append('name', state['restaurants'].get('advancedSearchName'));
  formData.append('location', state['restaurants'].get('advancedSearchLocation'));
  formData.append('nameEnabled', state['restaurants'].get('advancedSearchNameEnabled'));
  formData.append('locationEnabled', state['restaurants'].get('advancedSearchLocationEnabled'));
  formData.append('rankAbove', state['restaurants'].get('rankAbove'));
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData
      });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(RestaurantsActions.changeValue('searchResults', fromJS(json.restaurants)));
  } catch (e) {
    yield put(RestaurantsActions.changeValue('searchResults', List()));
  }
}

function* RestaurantsSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(RestaurantsConstants.LOAD_ALL_RESTAURANTS, loadRestaurants);
  yield takeEvery(RestaurantsConstants.BASIC_SEARCH, basicSearch);
  yield takeEvery(RestaurantsConstants.ADVANCED_SEARCH, advancedSearch);
}

export default RestaurantsSaga;
