import React, { useReducer } from 'react'; // useReducer - To have access to state and to dispatch to Reducer
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

// Create initial state
const ContactState = props => {
  const initialState = {
    contacts: null,
    currentContact: null,
    filtered: null,
    error: null,
    loading: true
  };

  // Pull out the state and dispatch to Reducer
  // state - to access anything in our state, dispatch - to dispatch objects to reducer
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // ACTIONS

  // Get Contacts
  const getContact = async () => {
    try {
      const res = await axios.get('/api/contacts');

      dispatch({
        type: GET_CONTACTS,
        payload: res.data // res.data is all of the users contacts
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response // Error message
      });
    }
  };

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
  const deleteContact = async _id => {
    try {
      // No need to store anything to 'res' variable
      await axios.delete(`/api/contacts/${_id}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: _id
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg // Error message
      });
    }
  };

  // Update Contact
  const updateContact = async contact => {
    // Need headers, because we are sending data
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data // res.data is contact object
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg // Error message
      });
    }
  };

  // Clear Contacts (on logout)
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
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
        loading: state.loading,
        getContact,
        addContact,
        deleteContact,
        clearContacts,
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
