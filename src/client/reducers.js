import { combineReducers } from 'redux';
import AppReducer from './components/app/reducer';
import RegisterReducer from './components/app/register/reducer';
import LoginReducer from './components/app/login/reducer';
import AddRestaurantReducer from "./components/app/restaurants/add-restaurant/reducer";
import RestaurantsReducer from "./components/app/restaurants/reducer";
import RestaurantReducer from "./components/app/restaurants/restaurant/reducer";
import ReviewReducer from "./components/app/restaurants/review/reducer";
import ProfilesReducer from "./components/app/profiles/reducer";
import ProfileReducer from "./components/app/profile/reducer";

export default combineReducers({
  app: AppReducer,
  register: RegisterReducer,
  login: LoginReducer,
  addRestaurant: AddRestaurantReducer,
  restaurants: RestaurantsReducer,
  restaurant: RestaurantReducer,
  review: ReviewReducer,
  profiles: ProfilesReducer,
  profile: ProfileReducer
});
