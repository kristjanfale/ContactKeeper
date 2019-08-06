const express = require('express'); // import express
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); // To get acces from the global variables, we created in config/default.json
const auth = require('../middleware/auth'); // Anytime I need to protect the route (@access - private) I need to bring in our middleware (as 2nd parameter)
const { check, validationResult } = require('express-validator');

// Import User model
const User = require('../models/User');

// @route       GET api/auth
// @decs        Get logged in user
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    // findById() is a mongoose method and returns all user data, including password
    const user = await User.findById(req.user.id).select('-password'); // If we send the correct token and we are logged in, the request object is going to have user object attached to it with the current logged in users id (because of the auth middleware)
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/auth
// @decs        Auth user & get token
// @access      Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // Do this only for routs that accept data and routs that need validation
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 status - user did not fulfill the required fields
      return res.status(400).json({ errors: errors.array() }); // In addition send an array of errors/objects ("location","param","msg")
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email }); // Find user(based on any field) in DB, with the same email

      // If the user does NOT exist
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      // If there is user, check the password (email has already been checked)
      const isMatch = await bcrypt.compare(password, user.password); // Compare password from req.body to the hash password of user stored in DB

      // If passwords don't match
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Object(data) that I send in the token (logged in users id), so we can access all of his contacts
      const payload = {
        user: {
          id: user.id // Get user.id from DB (_id field is created automatically in DB)
        }
      };

      // To generate token, I need to sign it (payload, secret, object of options, callback(err, token))
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
