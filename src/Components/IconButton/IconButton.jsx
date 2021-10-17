import React from 'react';
import PropTypes from 'prop-types';
import s from './IconButton.module.css';

const IconButton = ({ children, onClick, allyProps }) => {
  return (
    <button
      type="button"
      className={s.IconButton}
      onClick={onClick}
      {...allyProps}
    >
      {children}
    </button>
  );
};

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;
