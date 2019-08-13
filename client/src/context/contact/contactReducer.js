// Reducer - function that decides what is going to happen to the state, based on the action
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

// state - access initialState, action - access whatever we send in dispatch
export default (state, action) => {
  // We want to evaluate the type
  switch (action.type) {
    case ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => {
          // Return all contact that don't have the right id (delete the one that has the right id)
          return contact.id !== action.payload;
        })
      };
    case SET_CURRENT:
      return {
        ...state,
        currentContact: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        currentContact: null
      };
    default:
      return state;
  }
};
