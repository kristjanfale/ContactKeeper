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

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      // Put token(action.payload) we get back in LS
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token, // token
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload // error message
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
