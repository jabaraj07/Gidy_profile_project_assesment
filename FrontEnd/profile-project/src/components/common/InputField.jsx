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
  ...rest
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        {...register(name, rules)}
        readOnly={readOnly}
        disabled={disabled}
        {...rest}
      />
      {errors?.[name] && <p style={{ color: "red" }}>{errors[name].message}</p>}
    </div>
  );
};

export default InputField;
