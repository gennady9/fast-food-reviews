import initialState from '../../../initialState';
import {RestaurantsConstants} from './constants.js';

const RestaurantsReducer = (state = initialState.restaurants, action) => {
  switch (action.type) {
    case RestaurantsConstants.CHANGE_VALUE:
      return state.set(action.payload.name, action.payload.value);
    case RestaurantsConstants.SHOW_ADD_RESTAURANT:
      return state.set('isAddRestaurantShown', true);
    case RestaurantsConstants.HIDE_ADD_RESTAURANT:
      return state.set('isAddRestaurantShown', false);
    case RestaurantsConstants.SET_ADVANCED_SEARCH:
      return state.set('isAdvancedSearch', true);
    case RestaurantsConstants.SET_BASIC_SEARCH:
      return state.set('isAdvancedSearch', false);
    case RestaurantsConstants.SET_RESTAURANT_LIST:
      return state.set('restaurants', action.payload.restaurants);
    case RestaurantsConstants.SORT_RESTAURANTS: {
      const searchResults = state.get('searchResults');
      // 19986253 in meters is the longest distance in the world
      return state.set('searchResults',
        searchResults.sortBy(r =>
          (r.get('rankAverage') * 20) * ((100 - action.payload.rankDistance) / 100) +
          (100 - r.get('distance') / 19986253 * 100) * (action.payload.rankDistance / 100)
        ).reverse());
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default RestaurantsReducer
