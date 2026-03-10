import React from "react";

const InputField = ({
  label,
  register,
  name,
  errors,
  rules,
  required,
  readOnly = false,
  disabled = false,
  className = "",
  errorClassName = "",
  labelClassName = "",
  spanElement,
  ...rest
}) => {
  const hasError = errors?.[name];
  return (
    <>
      {label && (
        <label className={labelClassName} htmlFor={name}>
          {label} <span>{spanElement && spanElement}</span>
        </label>
      )}
      <input
        id={name}
        {...register(name, rules)}
        className={[className, hasError && "error"].filter(Boolean).join(" ")}
        readOnly={readOnly}
        disabled={disabled}
        {...rest}
      />
      {hasError && (
        <p className={errorClassName}>{errors[name].message}</p>
      )}
    </>
  );
};

export default InputField;
