const express = require('express'); // import express
const router = express.Router();

// @route       POST api/users
// @decs        Register a user
// @access      Public
router.post('/', (req, res) => {
  res.send('Register a user');
});

// Export the router
module.exports = router;
