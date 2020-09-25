import React from "react";
const Button = ({ text, color }) => {
  return <button class={`ui ${color} button`}>{text}</button>;
};

export default Button;
