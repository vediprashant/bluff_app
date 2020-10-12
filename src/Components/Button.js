import React from "react";
const Button = ({ text, color, onClick }) => {
  console.log(onClick);
  return (
    <button class={`ui ${color} button`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
