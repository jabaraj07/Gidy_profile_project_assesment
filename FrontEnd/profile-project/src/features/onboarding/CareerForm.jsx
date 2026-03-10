import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { AddCareer } from "../../api/profileApi";
import "./CareerForm.css";
import SelectInput from "../../components/common/SelectInput";
import InputField from "../../components/common/InputField";

const CareerForm = ({ mode = "onboarding", onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const { user, fetchUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.profile?.whatBestDescribeYou) {
      setValue("Describe", user.profile.whatBestDescribeYou);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    // console.log(data)
    try {
      const payload = {
        ...data,
        longTermAspiration: data.longTermAspiration?.value, // extract just the value string
      };
      console.log(payload);
      await AddCareer(payload);
      await fetchUser();
      if (mode === "onboarding") {
        navigate("/user_profile");
      } else {
        onClose?.();
      }
    } catch (error) {
      console.error("Error in careerForm:", error);
    }
  };

  const handleSkip = () => {
    navigate("/user_profile");
  };

  const aspirationalFieldOptions = [
    { label: "AI/ML Engineer", value: "ai_ml_engineer" },
    { label: "Data Scientist", value: "data_scientist" },
    { label: "Cloud Architect", value: "cloud_architect" },
    { label: "Cloud Security Engineer", value: "cloud_security_engineer" },
    { label: "Cybersecurity Specialist", value: "cybersecurity_specialist" },
    { label: "DevOps Engineer", value: "devops_engineer" },
    { label: "Site Reliability Engineer", value: "sre_engineer" },
    { label: "Software Architect", value: "software_architect" },
    { label: "Blockchain Developer", value: "blockchain_developer" },
    { label: "IoT Engineer", value: "iot_engineer" },
  ];

  const longTermOptions = [
    { value: "advisory_partner", label: "Advisory Partner" },
    { value: "board_member", label: "Board Member" },
    { value: "co_founder", label: "Co-Founder" },
    { value: "startup_founder", label: "Startup Founder" },
    { value: "software_architect", label: "Software Architect" },
    { value: "ceo", label: "CEO" },
    { value: "cto", label: "CTO" },
  ];

  const CareerArray = [
    { value: "Director", label: "Director" },
    { value: "Founder", label: "Founder" },
    { value: "Executive", label: "Executive" },
    { value: "Student", label: "Student" },
    { value: "Manager", label: "Manager" },
    { value: "Intern", label: "Intern" },
    { value: "Entry level professional", label: "Entry level professional" },
  ];

  const card = (
    <div className="career-card">
      {/* Header */}
      <h1 className="career-card__title">Personalize Your Profile</h1>
      <p className="career-card__subtitle">
        Tell us about your goals and aspirations
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="career-form__fields">
          {/* Long-Term Career Aspiration — CreatableSelect */}
          <div className="career-field">
            <SelectInput
              label="What Is Your Long-Term Career Aspiration?"
              spanElement="*"
              name="longTermAspiration"
              rules={{ required: "Please select an option" }}
              register={register}
              options={longTermOptions}
              errors={errors}
              defaultValue="E.g., CEO, CTO, Founder"
              errorClassName="career-field__error"
              optionsDivClassName="career-field__select-wrap"
              SelectClass="career-field__select"
              labelClassName="career-field__label"
            />
          </div>

          {/* Aspirational Field — select */}
          <div className="career-field">
            <SelectInput
              label="Aspirational Field"
              spanElement="*"
              name="aspirationalField"
              rules={{ required: "Please select an option" }}
              register={register}
              options={aspirationalFieldOptions}
              errors={errors}
              defaultValue="Select your field"
              errorClassName="career-field__error"
              optionsDivClassName="career-field__select-wrap"
              SelectClass="career-field__select"
              labelClassName="career-field__label"
            />
          </div>

          {/* Who Is Your Inspiration */}
          <div className="career-field">
            <InputField
              label="Who Is Your Inspiration?"
              spanElement="*"
              name="inspiration"
              register={register}
              placeholder="Enter the name of your inspiration"
              errors={errors}
              rules={{ required: "Inspiration field is required" }}
              className="career-field__input"
              errorClassName="career-field__error"
              labelClassName="career-field__label"
            />
          </div>

          {/* What Are You Aiming For Right Now */}
          <div className="career-field">
            <SelectInput
              label="What Are You Aiming For Right Now?"
              spanElement="*"
              name="currentAim"
              rules={{ required: "Please select an option" }}
              register={register}
              options={CareerArray}
              errors={errors}
              defaultValue="E.g., Developer, Designer, Engineer"
              errorClassName="career-field__error"
              optionsDivClassName="career-field__select-wrap"
              SelectClass="career-field__select"
              labelClassName="career-field__label"
            />
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="career-actions">
          {mode === "onboarding" && (
            <>
              <button
                type="button"
                className="career-btn--skip"
                onClick={handleSkip}
              >
                Skip This &amp; Complete
              </button>
              <button
                type="submit"
                className="career-btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving…" : "Complete"}
              </button>
              <button
                type="button"
                className="career-btn--back"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
            </>
          )}

          {mode === "edit" && (
            <>
              <button
                type="submit"
                className="career-btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving…" : "Update"}
              </button>
              <button
                type="button"
                className="career-btn--cancel"
                onClick={onClose}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );

  /* Edit mode — render inside modal overlay */
  if (mode !== "onboarding") {
    return <div className="career-modal-overlay">{card}</div>;
  }

  /* Onboarding mode — full page */
  return <div className="career-page">{card}</div>;
};

export default CareerForm;
