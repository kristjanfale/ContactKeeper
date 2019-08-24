// Reducer - function that decides what is going to happen to the state, based on the action
import { SET_ALERT, REMOVE_ALERT } from '../types';

// state - access initialState, action - access whatever we send in dispatch
export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload] // payload: { msg, style, id }
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => {
          return alert.id !== action.payload; // payload: id
        })
      };
    default:
      return state;
  }
};
