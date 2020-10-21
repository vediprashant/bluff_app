import React from "react";

import PropTypes from "prop-types";

/**
 * A Formatted Button
 * @param {*} param0 
 */
const Button = ({ text, color, onClick, className = "" }) => {
  return (
    <button className={`ui ${color} button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Button;
