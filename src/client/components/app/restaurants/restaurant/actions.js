import { RestaurantConstants} from './constants.js';
import {RestaurantsConstants} from "../constants";

function changeValue(name, value) {
  return {
    type: RestaurantConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}
//
// function clearState() {
//   return {
//     type: AddRestaurantConstants.CLEAR_STATE,
//   }
// }
//
// function setRestaurantName(name) {
//   return {
//     type: RestaurantConstants.SET_RESTAURANT_NAME,
//     payload: {name}
//   }
// }
//
// function setRestaurantLocation(location) {
//   return {
//     type: RestaurantConstants.SET_RESTAURANT_LOCATION,
//     payload: {location}
//   }
// }

function showAddReview() {
  return {
    type: RestaurantConstants.SHOW_ADD_REVIEW,
  }
}

function hideAddReview() {
  return {
    type: RestaurantConstants.HIDE_ADD_REVIEW,
  }
}

function loadRestaurant(id) {
  return {
    type: RestaurantConstants.LOAD_RESTAURANT,
    uri: `/api/restaurant?id=${id}`,
    payload:{id}
  }
}

function sortReviews(value) {
  return {
    type: RestaurantConstants.SORT_REVIEWS,
    payload:{value}
  }
}

let RestaurantActions  = {
  loadRestaurant,
  changeValue,
  showAddReview,
  hideAddReview,
  sortReviews
};

export default RestaurantActions;
