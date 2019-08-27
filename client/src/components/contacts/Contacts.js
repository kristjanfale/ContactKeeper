import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  const { contacts, filtered, loading, getContact } = useContext(
    ContactContext
  );

  useEffect(() => {
    getContact();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
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
      {contacts === null && loading ? (
        <Spinner />
      ) : (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='fade'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='fade'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      )}
    </Fragment>
  );
};

export default Contacts;
