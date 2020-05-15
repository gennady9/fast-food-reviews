import initialState from "../../../../initialState";
import {RestaurantConstants} from "./constants";

const RestaurantReducer = (state = initialState.restaurant, action) => {
  switch (action.type){
    case RestaurantConstants.CHANGE_VALUE:
      return state.set(action.payload.name, action.payload.value);
    case RestaurantConstants.SHOW_ADD_REVIEW:
      return state.set('isAddReviewShown', true);
    case RestaurantConstants.HIDE_ADD_REVIEW:
      return state.set('isAddReviewShown', false);
    case RestaurantConstants.SORT_REVIEWS: {
      const reviews = state.get('reviews');
      return state.set('reviews', reviews.sortBy(r => r.get(action.payload.value)).reverse());
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default RestaurantReducer
