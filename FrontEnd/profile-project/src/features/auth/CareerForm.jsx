import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { AddCareer } from "../../api/userAuth";
import "./CareerForm.css";

const CareerForm = ({ mode = "onboarding", onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
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
    console.log(payload)
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

  const card = (
    <div className="career-card">
      {/* Header */}
      <h1 className="career-card__title">Personalize Your Profile</h1>
      <p className="career-card__subtitle">Tell us about your goals and aspirations</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="career-form__fields">

          {/* Long-Term Career Aspiration — CreatableSelect */}
          <div className="career-field">
            <label className="career-field__label">
              What Is Your Long-Term Career Aspiration? <span>*</span>
            </label>
            <Controller
              name="longTermAspiration"
              control={control}
              rules={{ required: "Career aspiration is required" }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  options={longTermOptions}
                  placeholder="E.g., CEO, CTO, Founder"
                  isClearable
                  classNamePrefix="react-select"
                  className="career-creatable"
                />
              )}
            />
            {errors.longTermAspiration && (
              <p className="career-field__error">{errors.longTermAspiration.message}</p>
            )}
          </div>

          {/* Aspirational Field — select */}
          <div className="career-field">
            <label className="career-field__label" htmlFor="aspirationalField">
              Aspirational Field <span>*</span>
            </label>
            <div className="career-field__select-wrap">
              <select
                id="aspirationalField"
                className={`career-field__select${errors.aspirationalField ? " error" : ""}`}
                {...register("aspirationalField", { required: "Please select a field" })}
                defaultValue=""
              >
                <option value="" disabled>Select your field</option>
                {aspirationalFieldOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {errors.aspirationalField && (
              <p className="career-field__error">{errors.aspirationalField.message}</p>
            )}
          </div>

          {/* Who Is Your Inspiration */}
          <div className="career-field">
            <label className="career-field__label" htmlFor="inspiration">
              Who Is Your Inspiration? <span>*</span>
            </label>
            <input
              id="inspiration"
              type="text"
              placeholder="Enter the name of your inspiration"
              className={`career-field__input${errors.inspiration ? " error" : ""}`}
              {...register("inspiration", { required: "Inspiration field is required" })}
            />
            {errors.inspiration && (
              <p className="career-field__error">{errors.inspiration.message}</p>
            )}
          </div>

          {/* What Are You Aiming For Right Now */}
          <div className="career-field">
            <label className="career-field__label" htmlFor="currentAim">
              What Are You Aiming For Right Now? <span>*</span>
            </label>
            <div className="career-field__select-wrap">
              <select
                id="currentAim"
                className={`career-field__select${errors.currentAim ? " error" : ""}`}
                {...register("currentAim", { required: "Please select an option" })}
                defaultValue=""
              >
                <option value="" disabled>E.g., Developer, Designer, Engineer</option>
                <option value="Director">Director</option>
                <option value="Founder">Founder</option>
                <option value="Executive">Executive</option>
                <option value="Student">Student</option>
                <option value="Manager">Manager</option>
                <option value="Intern">Intern</option>
                <option value="Entry level professional">Entry Level Professional</option>
              </select>
            </div>
            {errors.currentAim && (
              <p className="career-field__error">{errors.currentAim.message}</p>
            )}
          </div>

        </div>

        {/* ── Actions ── */}
        <div className="career-actions">
          {mode === "onboarding" && (
            <>
              <button type="button" className="career-btn--skip" onClick={handleSkip}>
                Skip This &amp; Complete
              </button>
              <button type="submit" className="career-btn--primary" disabled={isSubmitting}>
                {isSubmitting ? "Saving…" : "Complete"}
              </button>
              <button type="button" className="career-btn--back" onClick={() => navigate(-1)}>
                ← Back
              </button>
            </>
          )}

          {mode === "edit" && (
            <>
              <button type="submit" className="career-btn--primary" disabled={isSubmitting}>
                {isSubmitting ? "Saving…" : "Update"}
              </button>
              <button type="button" className="career-btn--cancel" onClick={onClose}>
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
    return (
      <div className="career-modal-overlay">
        {card}
      </div>
    );
  }

  /* Onboarding mode — full page */
  return (
    <div className="career-page">
      {card}
    </div>
  );
};

export default CareerForm;