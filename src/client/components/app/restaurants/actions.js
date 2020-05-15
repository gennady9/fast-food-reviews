import {RestaurantsConstants} from './constants.js';
import {AddRestaurantConstants} from "./add-restaurant/constants";

function showAddRestaurant() {
  return {
    type: RestaurantsConstants.SHOW_ADD_RESTAURANT,
  }
}

function hideAddRestaurant() {
  return {
    type: RestaurantsConstants.HIDE_ADD_RESTAURANT,
  }
}

function setAdvancedSearch() {
  return {
    type: RestaurantsConstants.SET_ADVANCED_SEARCH,
  }
}

function setBasicSearch() {
  return {
    type: RestaurantsConstants.SET_BASIC_SEARCH,
  }
}

function loadAllRestaurants() {
  return {
    type: RestaurantsConstants.LOAD_ALL_RESTAURANTS,
    uri: '/api/restaurants'
  }
}

function setRestaurantList(restaurants) {
  return {
    type: RestaurantsConstants.SET_RESTAURANT_LIST,
    payload: {restaurants}
  }
}

function changeValue(name, value) {
  return {
    type: RestaurantsConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}

function sortRestaurants(rankDistance) {
  return {
    type: RestaurantsConstants.SORT_RESTAURANTS,
    payload: {rankDistance}
  }
}

function basicSearch(){
  return {
    type: RestaurantsConstants.BASIC_SEARCH,
    uri: '/api/restaurants/search'
  };
}

function advancedSearch(){
  return {
    type: RestaurantsConstants.ADVANCED_SEARCH,
    uri: '/api/restaurants/search/advanced'
  };
}

let RestaurantsActions = {
  showAddRestaurant,
  hideAddRestaurant,
  setBasicSearch,
  setAdvancedSearch,
  loadAllRestaurants,
  setRestaurantList,
  changeValue,
  basicSearch,
  advancedSearch,
  sortRestaurants
};

export default RestaurantsActions
