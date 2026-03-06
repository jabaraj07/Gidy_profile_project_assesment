import React from "react";

const Button = ({
  type = "button",
  children,
  onclick,
  disabled = false,
  className = "",
  ...props
}) => {
  // console.log(children)
  return (
    <button
      type={type}
      onClick={onclick}
      disabled={disabled}
      className={`btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
