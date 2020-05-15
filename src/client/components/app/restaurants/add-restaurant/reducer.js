import initialState from "../../../../initialState";
import {AddRestaurantConstants} from "./constants";

const AddRestaurantReducer = (state = initialState.addRestaurant, action) => {
  switch (action.type){
    case AddRestaurantConstants.CHANGE_VALUE:
      return state.set(action.payload.name, action.payload.value);
    case AddRestaurantConstants.CLEAR_STATE:
      return state.set('name', '').set('location', null);
    default: //otherwise state is lost!
      return state;
  }
};

export default AddRestaurantReducer
