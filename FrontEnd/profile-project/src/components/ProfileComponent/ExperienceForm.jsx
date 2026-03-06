import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { AddExperience, UpdateExperience } from "../../api/userAuth";
import InputField from "../common/InputField";

const ExperienceForm = ({ defaultValues = {}, onClose }) => {
  const { fetchUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: defaultValues.role || "",
      companyName: defaultValues.companyName || "",
      location: defaultValues.location || "",
      dateOfJoining: defaultValues.dateOfJoining || "",
      dateOfLeaving: defaultValues.dateOfLeaving || "",
      currentlyWorking: defaultValues.currentlyWorking || false,
    },
  });

  const currentlyWorking = watch("currentlyWorking");

  useEffect(() => {
    // keep leaving date cleared when checkbox toggles
    if (currentlyWorking) {
      setValue("dateOfLeaving", "");
    }
  }, [currentlyWorking, setValue]);

  const onSubmit = async (data) => {
    // strip empty dates so backend doesn't save 1970-01-01
    if (!data.dateOfJoining) delete data.dateOfJoining;
    if (!data.dateOfLeaving) delete data.dateOfLeaving;

    try {
      if (defaultValues._id) {
        await UpdateExperience(defaultValues._id, data);
      } else {
        await AddExperience(data);
      }
      await fetchUser();
      onClose();
    } catch (err) {
      console.error("Error saving experience:", err);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{defaultValues._id ? "Edit Experience" : "Add Experience"}</h2>

        <InputField
          label="Role"
          name="role"
          register={register}
          errors={errors}
          rules={{ required: "Role is required" }}
        />

        <InputField
          label="Company Name"
          name="companyName"
          register={register}
          errors={errors}
          rules={{ required: "Company name is required" }}
        />

        <InputField
          label="Location"
          name="location"
          register={register}
          errors={errors}
        />

        <div>
          <label>Date of joining</label>
          <input
            type="date"
            {...register("dateOfJoining", {
              validate: (val) => {
                if (watch("dateOfLeaving") && !val) {
                  return "Start date required if end date present";
                }
                return true;
              },
            })}
          />
          {errors.dateOfJoining && (
            <p style={{ color: "red" }}>{errors.dateOfJoining.message}</p>
          )}
        </div>

        {!currentlyWorking && (
          <div>
            <label>Date of leaving</label>
            <input
              type="date"
              {...register("dateOfLeaving", {
                validate: (val) => {
                  const start = watch("dateOfJoining");
                  if (val && start && new Date(val) < new Date(start)) {
                    return "End date cannot be before start date";
                  }
                  return true;
                },
              })}
            />
            {errors.dateOfLeaving && (
              <p style={{ color: "red" }}>{errors.dateOfLeaving.message}</p>
            )}
          </div>
        )}

        <div>
          <input type="checkbox" {...register("currentlyWorking")} />
          <label>Currently working in this role</label>
        </div>

        <button type="button" onClick={onClose} style={{ marginRight: "8px" }}>
          Cancel
        </button>
        <button type="submit">{defaultValues._id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default ExperienceForm;
