const mongoose = require('mongoose');

// mongoose.Schema takes in an object of properties
const ContactSchema = mongoose.Schema({
  // For relationship between Contact and User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: 'Personal'
  },
  date: {
    type: Date,
    default: Date.now // Put current time and date automatically
  }
});

// Export contacts model with the schema 'ContactSchema'
module.exports = mongoose.model('contact', ContactSchema);
