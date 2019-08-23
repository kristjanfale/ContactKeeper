import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
  // Initialize context
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert, removeAlert } = alertContext;
  const { register, error, clearErrors } = authContext;

  // For Errors
  useEffect(() => {
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error]); // Run this when error is added/changed

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '' // password comformation
  });

  const { name, email, password, password2 } = user;

  // Set user object to whatever we type in inputs
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    removeAlert();

    // Can do it this way or add 'required' on <input> element
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else if (password.length < 6) {
      setAlert('Password must contai at least 6 characters', 'danger');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span style={{ color: '#ff9900' }}>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            // required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            // required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            // required
            // minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            // required
            // minLength='6'
          />
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
    </div>
  );
};

export default Register;
