const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
  creationTime: Date,
  bathroomQuality: Number,
  staffKindness: Number,
  cleanliness: Number,
  driveThruQuality: Number,
  deliverySpeed: Number,
  foodQuality: Number,
  picture: { data: Buffer, contentType: String },
});

module.exports = mongoose.model('Review', reviewSchema);
