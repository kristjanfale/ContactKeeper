import React, { useReducer } from 'react'; // useReducer - To have access to state and to dispatch to Reducer
import uuid from 'uuid';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

// Create initial state (array of objects)
const AlertState = props => {
  const initialState = [];

  // Pull out the state and dispatch to Reducer
  // state - to access anything in our state, dispatch - to dispatch objects to reducer
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // ACTIONS

  // Set Alert
  const setAlert = (msg, style, timeout = 4000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, style, id }
    });

    // Delete alert after timeout(4sec)
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      });
    }, timeout);
  };

  // Retrun provider, so we can wrap entire app with this context
  // value = {{ anything that we want to access from components - state and actions }}
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
