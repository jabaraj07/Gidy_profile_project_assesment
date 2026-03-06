import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useAuth } from "../../context/authContext";
import { UpdateSkills } from "../../api/userAuth";

const SkillForm = ({ defaultValues = [], onClose }) => {
  const { fetchUser } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: (defaultValues || []).map((s) => ({ value: s, label: s })),
    },
  });

  const onSubmit = async (data) => {
    const skills = data.skills.map((o) => o.value || o);
    try {
      await UpdateSkills(skills);
      await fetchUser();
      onClose();
    } catch (err) {
      console.error("Error updating skills", err);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Skills</h2>
        <Controller
          name="skills"
          control={control}
          rules={{
            validate: (val) =>
              val && val.length > 0 ? true : "At least one skill is required",
          }}
          render={({ field }) => (
            <CreatableSelect
              {...field}
              isMulti
              placeholder="Type or select skills"
              styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          )}
        />
        {errors.skills && (
          <p style={{ color: "red" }}>{errors.skills.message}</p>
        )}
        <div className="button-group">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default SkillForm;
