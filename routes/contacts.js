const express = require('express'); // import express
const router = express.Router();
const auth = require('../middleware/auth'); // Anytime I need to protect the route (@access - private) I need to bring in our middleware (as 2nd parameter)
const { check, validationResult } = require('express-validator');

// Import User and Contact models
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route       GET api/contacts
// @decs        Get all USERS contacts(not all contact from database)
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    // Get contacts array for specific user
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    }); // Contact model has a user field, which is ObjectId. If we send the correct token and we are logged in, the request object is going to have user object attached to it with the current logged in users id (because of the auth middleware)
    // Return contacts
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/contacts
// @decs        Add new contact
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // Do this only for routs that accept data and routs that need validation
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 status - user did not fulfill the required fields
      return res.status(400).json({ errors: errors.array() }); // In addition send an array of errors/objects ("location","param","msg")
    }

    const { name, email, phone, type } = req.body;

    try {
      // Create new contact with Contact model
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id // Get the current logged in users id (from auth middleware)
      });

      // Save contact to DB
      const contact = await newContact.save();
      // Return contact
      res.json(contact);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT api/contacts/:id
// @decs        Update contact
// @access      Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    // Find contact in DB
    let contact = await Contact.findById(req.params.id); // req.params.id - to access the /:id in URL

    // If contact doesn't exist
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // If contact exist
    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update contact
    contact = await Contact.findByIdAndUpdate(
      req.params.id, // contact ID
      { $set: contactFields },
      { new: true } // true - return updated contact, false - return old contact
    );

    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/contacts/:id
// @decs        Delete contact
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find contact in DB
    let contact = await Contact.findById(req.params.id); // req.params.id - to access the /:id in URL

    // If contact doesn't exist
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // If contact exist
    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Delete contact
    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// Export the router
module.exports = router;
