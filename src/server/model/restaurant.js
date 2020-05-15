const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  location: {type: {location: String, latitude: Number, longitude: Number}, required: true},
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
