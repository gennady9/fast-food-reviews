const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const saltRounds = 10;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  location: {type: {location: String, latitude: Number, longitude: Number}, required: true},
  picture: {data: Buffer, contentType: String}
});

userSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    bcrypt.hash(this.password, saltRounds,
      (err, hashedPassword) => {
        if (err) {
          next(err);
        }
        else {
          this.password = hashedPassword;
          next();
        }
      });
  } else {
    next();
  }
});

userSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

module.exports = mongoose.model('User', userSchema);
