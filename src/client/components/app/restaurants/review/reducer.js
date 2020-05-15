import initialState from "../../../../initialState";
import {ReviewConstants} from "./constants";

const ReviewReducer = (state = initialState.review, action) => {
  switch (action.type){
    case ReviewConstants.CHANGE_VALUE:
      return state.set(action.payload.name, action.payload.value);
    case ReviewConstants.CLEAR_STATE:
      return state.set('name', '').set('location', null);
    default: //otherwise state is lost!
      return state;
  }
};

export default ReviewReducer
