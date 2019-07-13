const express = require('express'); // import express
const router = express.Router();

// @route       GET api/auth
// @decs        Get logged in user
// @access      Private
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @route       POST api/auth
// @decs        Auth user & get token
// @access      Public
router.post('/', (req, res) => {
  res.send('Log in user');
});

// Export the router
module.exports = router;
