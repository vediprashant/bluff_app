import React from "react";

const Button = ({ text, color, onClick, className }) => {
  return (
    <button class={`ui ${color} button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
