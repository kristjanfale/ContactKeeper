import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  const { setAlert } = useContext(AlertContext);
  const { login, error, clearErrors, isAuthenticated, loadUser } = useContext(
    AuthContext
  );

  useEffect(() => {
    loadUser();
    if (isAuthenticated) {
      //If user is valid, redirect to '/'
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]); // Run useEffect when [...] is added/changed

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  // Set user object to whatever we type in inputs
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    // Can do it this way or add 'required' on <input> element
    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      // Send input data to backend and fetch token
      login({
        email,
        password
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span style={{ color: '#ff9900' }}>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
    </div>
  );
};

export default Login;
