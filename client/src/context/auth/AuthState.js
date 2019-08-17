import React, { useReducer } from 'react'; // useReducer - To have access to state and to dispatch to Reducer
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

// Create initial state
const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null, // To see if we're logged in
    loading: true,
    user: null,
    error: null
  };

  // Pull out the state and dispatch to Reducer
  // state - to access anything in our state, dispatch - to dispatch objects to reducer
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // ACTIONS

  // Load User

  // Register User

  // Login User

  // Logout

  // Clear Errors

  // Retrun provider, so we can wrap entire app with this context
  // value = {{ anything that we want to access from components - state and actions }}
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
