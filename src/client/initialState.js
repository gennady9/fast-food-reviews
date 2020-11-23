const {Map, List} = require('immutable');

export default {
  app: Map({username: null, loading: true, requireAuth: false, userId: null}),
  register: Map({
    username: '',
    password: '',
    location: null,
    picture: '',
    userTaken: false,
    completed: false,
    error: false,
  }),
  login: Map({
    username: '',
    password: '',
    error: false,
    completed: false
  }),
  addRestaurant: Map({
    name: '',
    location: null
  }),
  restaurants: Map({
    isAddRestaurantShown: false,
    restaurants: List(),
    isAdvancedSearch: false,
    basicSearchName: '',
    advancedSearchName: '',
    advancedSearchLocation: '',
    advancedSearchNameEnabled: false,
    advancedSearchLocationEnabled: false,
    rankAbove: 0,
    searchResults: List(),
  }),
  restaurant: Map({
    id: '',
    name: '',
    location: '',
    isAddReviewShown: false,
    reviews: List(),
  }),
  review: Map({
    user: '',
    bathroomQuality: 1,
    staffKindness: 1,
    cleanliness: 1,
    driveThruQuality: 0,
    deliverySpeed: 0,
    foodQuality: 1,
    picture: '',
    restaurant: '',
  }),
  profiles: Map({
    searchUser: '',
    searchLocation: '',
    searchLocationEnabled: false,
    searchNameEnabled: false,
    users: List()
  }),
  profile: Map({
    userTaken: false,
    name: '',
    location: '',
    reviews: List(),
    picture: Map({}),
    isEditReviewShown: false,
    editReview: Map({}),
    updateLocation: null,
    updateName: ''
  }),
};
