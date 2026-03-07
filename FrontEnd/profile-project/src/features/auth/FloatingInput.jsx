import React, { useState } from "react";
import "./FloatingInput.css";
import EyeOffIcon from "../../components/icons/EyeOffIcon";
import EyeIcon from "../../components/icons/EyeIcon";
const FloatingInput = ({
  label,
  type: initialType,
  name,
  register,
  rules,
  errors,
  clearErrors,
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = initialType === "password";
  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : initialType;
  const isFloating = focused || hasValue;

  const { onChange, onBlur, ref, ...rest } = register(name, rules);

  return (
    <div style={{ position: "relative", marginBottom: "6px" }}>
      <div
        className={`input-wrapper ${errors?.[name] ? "error" : focused ? "focused" : ""}`}
      >
        {/* Floating Label */}
        <label
          htmlFor={name}
          className={`input-label ${errors?.[name] ? "error" : focused ? "focused" : ""} ${isFloating ? "floating" : ""}`}
        >
          {label}
          {rules?.required && (
            <span
              className={`rules ${errors?.[name] ? "error" : focused ? "focused" : ""}`}
            >
              *
            </span>
          )}
        </label>

        {/* Input */}
        <input
          id={name}
          type={inputType}
          ref={ref}
          {...rest}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0);
            onChange(e);
            clearErrors();
          }}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur(e);
          }}
          className="input"
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="iconButton"
            tabIndex={-1}
          >
            {showPassword ? (
              // Eye-off icon
              <EyeOffIcon />
            ) : (
              // Eye icon
              <EyeIcon />
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {errors?.[name] && (
        <p className="Error-message">{errors[name].message}</p>
      )}
    </div>
  );
};
export default FloatingInput;
