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
          return contact.id !== action.payload; // Return all contact that don't have the right id (delete the one that has the right id)
        }),
        filtered:
          state.filtered === null
            ? null
            : state.filtered.filter(contact => contact.id !== action.payload) // Return all contact that don't have the right id (delete the one that has the right id)
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
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
    default:
      return state;
  }
};
