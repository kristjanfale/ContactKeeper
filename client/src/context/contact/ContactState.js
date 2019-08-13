import React, { useReducer } from 'react'; // useReducer - To have access to state and to dispatch to Reducer
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

// Create initial state
const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Bob Bobson',
        email: 'bb@gmail.com',
        phone: '031-214-123',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Marry Pop',
        email: 'mp@gmail.com',
        phone: '031-345-000',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Henry Norton',
        email: 'henry@gmail.com',
        phone: '515-331-789',
        type: 'professional'
      }
    ],
    currentContact: null
  };

  // Pull out the state and dispatch from Reducer
  // state - to access anything in our state, dispatch - to dispatch objects to reducer
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // ACTIONS

  // Add Contact
  const addContact = contact => {
    // Generate a random ID
    contact.id = uuid.v4();
    // Dispatch to reducer
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  };

  // Delete Contact
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  };

  // Set Current Contact
  const setCurrentContact = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };

  // Clear Current Contact
  const clearCurrentContact = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  // Update Contact

  // Filter Contacts

  // Clear Fillter

  // Retrun provider, so we can wrap entire app with this context
  // value = {{ anything that we want to access from components - state and actions }}
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
