import React from "react";

const SelectInput = ({ label, name,options,register }) => {
  return (
    <div>
      <label>{label}</label>
      <select {...register(name)}>
        <option value="">Select</option>
        {options.map((opt) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
