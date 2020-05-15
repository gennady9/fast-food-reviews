import {all} from 'redux-saga/effects'
import AppSaga from './components/app/saga'
import RegisterSaga from "./components/app/register/saga";
import LoginSaga from "./components/app/login/saga";
import AddRestaurantSaga from "./components/app/restaurants/add-restaurant/saga";
import RestaurantsSaga from "./components/app/restaurants/saga";
import RestaurantSaga from "./components/app/restaurants/restaurant/saga";
import ReviewSaga from "./components/app/restaurants/review/saga";
import ProfilesSaga from "./components/app/profiles/saga";
import ProfileSaga from "./components/app/profile/saga";

export default function* Sagas() {
  yield all([
    AppSaga(),
    RegisterSaga(),
    LoginSaga(),
    AddRestaurantSaga(),
    RestaurantsSaga(),
    RestaurantSaga(),
    ReviewSaga(),
    ProfilesSaga(),
    ProfileSaga()
  ])
}
