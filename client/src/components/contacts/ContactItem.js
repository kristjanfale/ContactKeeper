import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import PropTypes from 'prop-types';

// Props - contact
const ContactItem = ({ contact: { name, email, phone, type } }) => {
  const contactContext = useContext(ContactContext);

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'capitalize badge ' +
            (type === 'personal' ? 'badge-success' : 'badge-primary')
          }
        >
          {type}
          {/* first letter to uppercase (type.charAt(0).toUpperCase() + type.slice(1)) */}
        </span>
      </h3>
      <ul>
        {/* If there is an email, show it */}
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {/* If there is a phone number, show it */}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-light btn-sm'>Edit</button>
        <button className='btn btn-dark btn-sm'>Delete</button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
