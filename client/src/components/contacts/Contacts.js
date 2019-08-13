import React, { Fragment, useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  // Initialize Contacts Context
  const contactContext = useContext(ContactContext); // Now we have access to any state or methods/actions

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4 className='text-center'>Please add contacts</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
    </Fragment>
  );
};

export default Contacts;
