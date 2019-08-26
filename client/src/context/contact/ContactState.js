import React, { useReducer } from 'react'; // useReducer - To have access to state and to dispatch to Reducer
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

// Create initial state
const ContactState = props => {
  const initialState = {
    contacts: [],
    currentContact: null,
    filtered: null,
    error: null
  };

  // Pull out the state and dispatch to Reducer
  // state - to access anything in our state, dispatch - to dispatch objects to reducer
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // ACTIONS

  // Add Contact
  const addContact = async contact => {
    // Need headers, because we are sending data
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/contacts', contact, config);

      dispatch({
        type: ADD_CONTACT,
        payload: res.data // res.data is new added contact to DB
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg // Error message
      });
    }
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
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    });
  };

  // Filter Contacts
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    });
  };

  // Clear Fillter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  // Retrun provider, so we can wrap entire app with this context
  // value = {{ anything that we want to access from components - state and actions }}
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
