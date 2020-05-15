import { AddRestaurantConstants} from './constants.js';

function changeValue(name, value) {
  return {
    type: AddRestaurantConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}

function clearState() {
  return {
    type: AddRestaurantConstants.CLEAR_STATE,
  }
}

function addRestaurant() {
  return {
    type: AddRestaurantConstants.ADD_RESTAURANT,
    uri: '/api/restaurant'
  }
}

let AddRestaurantActions  = {
  changeValue,
  clearState,
  addRestaurant
};

export default AddRestaurantActions;
