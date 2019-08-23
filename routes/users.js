const express = require('express'); // import express
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); // To get acces from the global variables, we created in config/default.json
const { check, validationResult } = require('express-validator');

// Import User model
const User = require('../models/User');

// @route       POST api/users
// @decs        Register a user
// @access      Public
router.post(
  '/',
  [
    // name must not be empty
    check('name', 'Please add a name')
      .not()
      .isEmpty(),
    // email must be an email
    check('email', 'Please include a valid email').isEmail(),
    // password must be at least 6 chars long
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // Do this only for routs that accept data and routs that need validation
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 status - user did not fulfill the required fields
      return res.status(400).json({ errors: errors.array() }); // In addition send an array of errors/objects ("location","param","msg")
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email }); // Find user(based on any field) in DB, with the same email

      // If the user exist
      if (user) {
        console.log('bebebebe');
        return res.status(400).json({ msg: 'User already exists' });
      }

      // If the user doesn't exist, create a new one with User model (_id field is created automatically in DB)
      user = new User({
        name: name,
        email: email,
        password: password
      });

      // Before we save the user to DB, need to encrypt the password
      const salt = await bcrypt.genSalt(10); // genSalt(number of rounds-how secured the salt is)
      // Hash the password
      user.password = await bcrypt.hash(password, salt);

      // Save user to DB
      await user.save();

      // After user registers, send him token (send him token when he loggs in too)
      // Object(data) that I send in the token (logged in users id), so we can access all of his contacts
      const payload = {
        user: {
          id: user.id // Get user.id from DB (_id field is created automatically in DB)
        }
      };

      // To generate and return token, I need to sign it (payload, secret, object of options, callback(err, token))
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Export the router
module.exports = router;
