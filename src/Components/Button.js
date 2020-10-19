import React from "react";

import PropTypes from "prop-types";

const Button = ({ text, color, onClick, className }) => {
  return (
    <button class={`ui ${color} button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
