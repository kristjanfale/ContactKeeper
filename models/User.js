const mongoose = require('mongoose');

// mongoose.Schema takes in an object of properties (that we want the user to have)
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now // Put current time and date automatically
  }
});

// Export user model with the schema 'UserSchema'
// mongoose.model('creates a new model using the plural', Schema)
module.exports = mongoose.model('user', UserSchema);
