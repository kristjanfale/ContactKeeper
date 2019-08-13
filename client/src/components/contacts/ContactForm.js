import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  // Initialize Contacts Context
  const contactContext = useContext(ContactContext); // Now we have access to any state or methods/actions
  const {
    addContact,
    currentContact,
    clearCurrentContact,
    updateContact
  } = contactContext;

  useEffect(() => {
    if (currentContact !== null) {
      // Set fields in form to contact we want to edit
      setContact(currentContact);
    } else {
      // Set fields in form to nothing
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, currentContact]); // We only want this if contactContext or currentContact has changed

  // COMPONENT STATE
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  // ACTIONS

  const onChange = e => {
    // Set contact object to whatever we type in inputs
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    // If the current contact is null
    if (currentContact === null) {
      // Add Contact
      addContact(contact);
      // If we want to update contact
    } else {
      updateContact(contact);
    }
    // Clear the form
    clearAll();
  };

  const clearAll = () => {
    // Clear input fields
    clearCurrentContact();
  };

  return (
    <form onSubmit={onSubmit} className='text-center'>
      <h2 className='text-primary'>
        {/* If we want to edit or add new contact */}
        {currentContact ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional
      <div>
        {/* If we want to edit or add new contact */}
        <input
          type='submit'
          value={currentContact ? 'Update Contact' : 'Add Contact'}
          className='btn btn-success'
        />
      </div>
      {/* Clear Button */}
      {currentContact && (
        <div>
          <button className='btn btn-dark' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
