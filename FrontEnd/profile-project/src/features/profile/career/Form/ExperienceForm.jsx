import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../context/authContext";
import { AddExperience, UpdateExperience } from "../../../../api/experienceApi";
import InputField from "../../../../components/common/InputField";
import "./AllForm.css";
import "./ExperienceForm.css";
import Button from "../../../../components/common/Button";
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
    if (currentlyWorking) {
      setValue("dateOfLeaving", "");
    }
  }, [currentlyWorking, setValue]);

  const onSubmit = async (data) => {
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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>{defaultValues._id ? "Edit Experience" : "Add Experience"}</h2>

        <div className="InputField">
          <InputField
            label="Role"
            name="role"
            register={register}
            errors={errors}
            rules={{ required: "Role is required" }}
            spanElement="*"
            className="FormInput"
            labelClassName="FormInput_label"
            errorClassName="FormInput_error"
          />
        </div>

        <div className="InputField">
          <InputField
            label="Company Name"
            name="companyName"
            register={register}
            errors={errors}
            rules={{ required: "Company name is required" }}
            className="FormInput"
            spanElement="*"
            labelClassName="FormInput_label"
            errorClassName="FormInput_error"
          />
        </div>

        <div className="InputField">
          <InputField
            label="Location"
            name="location"
            register={register}
            errors={errors}
            className="FormInput"
            labelClassName="FormInput_label"
            errorClassName="FormInput_error"
          />
        </div>

        <div className="InputField">
          <InputField
            label="Date of joining"
            name="dateOfJoining"
            type="date"
            register={register}
            errors={errors}
            className="FormInput"
            labelClassName="FormInput_label"
            rules={{
              validate: (val) => {
                if (watch("dateOfLeaving") && !val) {
                  return "Start date required if end date present";
                }
                return true;
              },
            }}
          />
        </div>

        {!currentlyWorking && (
          <div className="InputField">
            <InputField
              label="Date of Leaving"
              name="dateOfLeaving"
              type="date"
              register={register}
              errors={errors}
              labelClassName="FormInput_label"
              className="FormInput"
              rules={{
                validate: (val) => {
                  const start = watch("dateOfJoining");
                  if (val && start && new Date(val) < new Date(start)) {
                    return "End date cannot be before start date";
                  }
                  return true;
                },
              }}
            />
          </div>
        )}

        <div className="checkbox-field">
          <input
            id="currentlyWorking"
            type="checkbox"
            {...register("currentlyWorking")}
          />
          <label htmlFor="currentlyWorking" className="checkbox-label">
            Currently working in this role
          </label>
        </div>

        <div className="btn_div">
          <Button onclick={onClose} className="Exp_form_cancel_btn">
            Cancel
          </Button>

          <Button type="submit" className="Exp_form_add_btn">
            {defaultValues._id ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;
