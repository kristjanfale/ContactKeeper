import React, { useReducer } from 'react'; // useReducer - To have access to state and to dispatch to Reducer
import axios from 'axios';
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
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      // Fetch data (token)
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data // res.data is token
      });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg // If the user already exists, it will return this error
      });
    }
  };

  // Login User

  // Logout

  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  // Retrun provider, so we can wrap entire app with this context
  // value = {{ anything that we want to access from components - state and actions }}
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
