const express = require('express'); // import express
const router = express.Router();

// @route       GET api/contacts
// @decs        Get all USERS contacts(not all contact from database)
// @access      Private
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

// @route       POST api/contacts
// @decs        Add new contact
// @access      Private
router.post('/', (req, res) => {
  res.send('Add contact');
});

// @route       PUT api/contacts/:id
// @decs        Update contact
// @access      Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route       DELETE api/contacts/:id
// @decs        Delete contact
// @access      Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

// Export the router
module.exports = router;
