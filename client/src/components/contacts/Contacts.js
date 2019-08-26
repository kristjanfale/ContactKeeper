import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  // Initialize Contacts Context
  const contactContext = useContext(ContactContext); // Now we have access to any state or methods/actions

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return (
      <TransitionGroup>
        <CSSTransition key='0' timeout={500} classNames='fade'>
          <h4 className='text-center'>No Contacts</h4>
        </CSSTransition>
      </TransitionGroup>
    );
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(contact => (
              <CSSTransition key={contact._id} timeout={500} classNames='fade'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map(contact => (
              <CSSTransition key={contact._id} timeout={500} classNames='fade'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
