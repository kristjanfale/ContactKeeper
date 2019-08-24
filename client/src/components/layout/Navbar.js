import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Props - Title and Icon
const Navbar = ({ title, icon }) => {
  return (
    <div className='navbar'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>
            <b>Home</b>
          </Link>
        </li>
        <li>
          <Link to='/about'>
            <b>About</b>
          </Link>
        </li>{' '}
        <li>
          <Link to='/register'>
            <b>Register</b>
          </Link>
        </li>{' '}
        <li>
          <Link to='/login'>
            <b>Login</b>
          </Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
};

export default Navbar;
