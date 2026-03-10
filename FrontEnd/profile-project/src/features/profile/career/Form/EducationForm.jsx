import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../context/authContext";
import { AddEducation, UpdateEducation } from "../../../../api/educationApi";
import InputField from "../../../../components/common/InputField";
import "./AllForm.css";
import "./EducationForm.css";
import Button from "../../../../components/common/Button";

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

        <div className="InputField">
          <InputField
            label="College"
            spanElement="*"
            name="collegeName"
            register={register}
            errors={errors}
            rules={{ required: "College is required" }}
            disabled={!!defaultValues._id}
            readOnly={!!defaultValues._id}
            className="FormInput"
            labelClassName="FormInput_label"
            errorClassName="FormInput_error"
          />
        </div>

        <div className="InputField">
          <InputField
            label="Degree"
            spanElement="*"
            name="degree"
            register={register}
            errors={errors}
            rules={{ required: "Degree is required" }}
            className="FormInput"
            labelClassName="FormInput_label"
            errorClassName="FormInput_error"
          />
        </div>

        <div className="InputField">
          <InputField
            label="Field of Study"
            spanElement="*"
            name="fieldOfStudy"
            register={register}
            errors={errors}
            rules={{ required: "Field of study is required" }}
            className="FormInput"
            labelClassName="FormInput_label"
            errorClassName="FormInput_error"
          />
        </div>

        <div className="InputField">
          <InputField
            label="Location"
            spanElement="*"
            name="location"
            register={register}
            errors={errors}
            rules={{ required: "Location is required" }}
            disabled={!!defaultValues._id}
            readOnly={!!defaultValues._id}
            className="FormInput"
            labelClassName="FormInput_label"
            errorClassName="FormInput_error"
          />
        </div>

        <div className="InputField">
          <InputField
            label="Date of joining"
            spanElement="*"
            name="dateOfJoining"
            type="date"
            register={register}
            errors={errors}
            className="FormInput"
            labelClassName="FormInput_label"
            errorClassName="Education_Field_error"
            rules={{
              required: "Start date is required",
              validate: (val) => {
                if (watch("dateOfCompletion") && !val) {
                  return "Start date required if completion date present";
                }
                return true;
              },
            }}
          />
        </div>

        <div className="checkbox-div">
          <div className="checkbox-field">
            <input
              id="checkbox"
              type="checkbox"
              {...register("currentlyStudying")}
            />
            <label htmlFor="checkbox" className="checkbox-label">
              Currently studying here / not completed
            </label>
          </div>
          <div>
            <p>OR</p>
          </div>
        </div>

        <div className="InputField">
          <InputField
            label="Date of completion"
            spanElement="*"
            name="dateOfCompletion"
            type="date"
            register={register}
            disabled={currentlyStudying}
            errors={errors}
            labelClassName="FormInput_label"
            className="FormInput"
            errorClassName="Education_Field_error"
            rules={{
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
            }}
          />
        </div>
        <div className="btn_div">
          <Button onclick={onClose} className="Education_form_cancel_btn">
            Cancel
          </Button>

          <Button type="submit" className="Education_form_add_btn">
            {defaultValues._id ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;
