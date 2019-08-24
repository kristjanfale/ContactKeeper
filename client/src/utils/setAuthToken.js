// Check  if there is a 'token' variable in our localStorage
// If it is, add 'x-auth-token' variable with the value token to our request/default header
// If not, delete 'x-auth-token' request/default header.
import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
