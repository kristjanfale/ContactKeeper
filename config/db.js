const mongoose = require('mongoose');

const config = require('config'); // To get acces from the global variable, we created in default.json
const db = config.get('mongoURI'); // Put mongoURI from config file in variable db

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
