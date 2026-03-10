import React from "react";

const SelectInput = ({
  label,
  name,
  options,
  register,
  spanElement,
  errors,
  errorClassName = "",
  optionsDivClassName = "",
  SelectClass = "",
  labelClassName="",
  rules,
  defaultValue
}) => {
  const hasError = errors?.[name];
  return (
    <>
      <label className={labelClassName} htmlFor={name}>
        {label} {spanElement && <span>{spanElement}</span>}
      </label>
      <div className={optionsDivClassName}>

        <select
          defaultValue=""
          {...register(name, rules)}
          id={name}
          className={[SelectClass, hasError && "error"]
            .filter(Boolean)
            .join(" ")}
        >
          <option value="" disabled>
            {defaultValue ? defaultValue : "Select"}
          </option>
          {options.map((opt) => {
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      </div>
      {hasError && <p className={errorClassName}>{errors[name].message}</p>}
    </>
  );
};

export default SelectInput;
