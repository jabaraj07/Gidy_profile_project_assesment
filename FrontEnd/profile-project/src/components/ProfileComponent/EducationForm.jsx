import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { AddEducation, UpdateEducation } from "../../api/userAuth";
import InputField from "../common/InputField";

const EducationForm = ({ defaultValues = {}, onClose }) => {
  const { fetchUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      collegeName: defaultValues.collegeName || "",
      degree: defaultValues.degree || "",
      fieldOfStudy: defaultValues.fieldOfStudy || "",
      location: defaultValues.location || "",
      dateOfJoining: defaultValues.dateOfJoining || "",
      dateOfCompletion: defaultValues.dateOfCompletion || "",
      currentlyStudying: defaultValues.currentlyStudying || false,
    },
  });

  const currentlyStudying = watch("currentlyStudying");

  useEffect(() => {
    if (currentlyStudying) {
      setValue("dateOfCompletion", "");
    }
  }, [currentlyStudying, setValue]);

  const onSubmit = async (data) => {
    // strip empty dates before submit
    if (!data.dateOfJoining) delete data.dateOfJoining;
    if (!data.dateOfCompletion) delete data.dateOfCompletion;

    try {
      if (defaultValues._id) {
        await UpdateEducation(defaultValues._id, data);
      } else {
        await AddEducation(data);
      }
      await fetchUser();
      onClose();
    } catch (err) {
      console.error("Error saving education:", err);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{defaultValues._id ? "Edit Education" : "Add Your Education"}</h2>

        <InputField
          label="College *"
          name="collegeName"
          register={register}
          errors={errors}
          rules={{ required: "College is required" }}
          disabled={!!defaultValues._id} // disable on edit if id exists
          readOnly={!!defaultValues._id}
        />

        <InputField
          label="Degree *"
          name="degree"
          register={register}
          errors={errors}
          rules={{ required: "Degree is required" }}
        />

        <InputField
          label="Field of Study *"
          name="fieldOfStudy"
          register={register}
          errors={errors}
          rules={{ required: "Field of study is required" }}
        />

        <InputField
          label="Location *"
          name="location"
          register={register}
          errors={errors}
          rules={{ required: "Location is required" }}
          disabled={!!defaultValues._id}
          readOnly={!!defaultValues._id}
        />

        <div>
          <label>Date of joining *</label>
          <input
            type="date"
            {...register("dateOfJoining", {
              required: "Start date is required",
              validate: (val) => {
                if (watch("dateOfCompletion") && !val) {
                  return "Start date required if completion date present";
                }
                return true;
              },
            })}
          />
          {errors.dateOfJoining && (
            <p style={{ color: "red" }}>{errors.dateOfJoining.message}</p>
          )}
        </div>

        {!currentlyStudying && (
          <div>
            <label>Date of completion</label>
            <input
              type="date"
              {...register("dateOfCompletion", {
                validate: (val) => {
                  const start = watch("dateOfJoining");
                  if (!currentlyStudying && !val) {
                    return "Either completion date or 'currently studying' must be provided";
                  }
                  if (val && start && new Date(val) < new Date(start)) {
                    return "Completion date cannot be before joining";
                  }
                  return true;
                },
              })}
            />
            {errors.dateOfCompletion && (
              <p style={{ color: "red" }}>{errors.dateOfCompletion.message}</p>
            )}
          </div>
        )}

        <div>
          <input type="checkbox" {...register("currentlyStudying")} />
          <label>Currently studying here / not completed</label>
        </div>

        <button type="button" onClick={onClose} style={{ marginRight: "8px" }}>
          Cancel
        </button>
        <button type="submit">{defaultValues._id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default EducationForm;
