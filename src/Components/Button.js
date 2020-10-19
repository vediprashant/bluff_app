import React from "react";

import PropTypes from "prop-types";

const Button = ({ text, color, onClick, className = "" }) => {
  return (
    <button className={`ui ${color} button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
