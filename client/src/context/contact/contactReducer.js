// Reducer - function that decides what is going to happen to the state, based on the action
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

// state - access initialState, action - access whatever we send in dispatch
export default (state, action) => {
  // We want to evaluate the type
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => {
          return contact._id !== action.payload; // Return all contact that don't have the right _id (delete the one that has the right _id)
        }),
        filtered:
          state.filtered === null
            ? null
            : state.filtered.filter(contact => contact._id !== action.payload), // Return all contact that don't have the right _id (delete the one that has the right _id)
        loading: false
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        currentContact: null,
        loading: true
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        loading: false
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
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          // With regular expresion we just want to match the text
          const regex = new RegExp(`${action.payload}`, 'gi'); // 'gi' - global and case-sensitive
          // Match name/email of the contact with the regular expresion
          return contact.name.match(regex) || contact.email.match(regex); // This will return anything where the name/email matches the text, that is passed in
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
