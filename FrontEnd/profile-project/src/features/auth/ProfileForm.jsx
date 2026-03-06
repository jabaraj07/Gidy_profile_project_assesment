import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { addProfile } from "../../api/userAuth";
import { useNavigate } from "react-router-dom";
import "./ProfileForm.css";

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({ mode: "onChange" });

  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
    }
  }, [user, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("lastName", data.lastName);
    formData.append("whatBestDescribeYou", data.Describe);
    if (data.profileImage?.[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }
    try {
      const response = await addProfile(formData);
      setUser(response.data.userData);
      reset();
      navigate("/career");
    } catch (error) {
      console.error("Error in profile form:", error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Header */}
        <h1 className="profile-card__title">Welcome to Gidy!</h1>
        <p className="profile-card__subtitle">
          Let's get you started with your profile setup
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Avatar upload */}
          <label className="profile-avatar-wrap" htmlFor="profileImage">
            <div className="profile-avatar">
              <div className="profile-avatar__icon">
                {preview ? (
                  <img src={preview} alt="Profile preview" />
                ) : (
                  /* Person silhouette SVG */
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                )}
              </div>
              <div className="profile-avatar__camera">
                {/* Camera icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
            </div>
            <p className="profile-avatar__label">Click to upload your profile picture</p>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              {...register("profileImage")}
              onChange={(e) => {
                register("profileImage").onChange(e);
                handleImageChange(e);
              }}
            />
          </label>

          {/* Fields */}
          <div className="profile-form__fields">
            {/* First Name */}
            <div className="profile-field">
              <label className="profile-field__label" htmlFor="name">
                First Name <span>*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`profile-field__input${errors.name ? " error" : ""}`}
                {...register("name", { required: "First name is required" })}
              />
              {errors.name && (
                <p className="profile-field__error">{errors.name.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="profile-field">
              <label className="profile-field__label" htmlFor="lastName">
                Last Name <span>*</span>
              </label>
              <input
                id="lastName"
                type="text"
                className={`profile-field__input${errors.lastName ? " error" : ""}`}
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="profile-field__error">{errors.lastName.message}</p>
              )}
            </div>

            {/* What Best Describes You */}
            <div className="profile-field">
              <label className="profile-field__label" htmlFor="Describe">
                What Best Describes You? <span>*</span>
              </label>
              <div className="profile-field__select-wrap">
                <select
                  id="Describe"
                  className={`profile-field__select${errors.Describe ? " error" : ""}`}
                  {...register("Describe", { required: "Please select an option" })}
                  defaultValue=""
                >
                  <option value="" disabled>Select an option</option>
                  <option value="jobseeker">Job Seeker</option>
                  <option value="intern">Intern</option>
                  <option value="student">Student</option>
                  <option value="recruiter">Recruiter</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>
              {errors.Describe && (
                <p className="profile-field__error">{errors.Describe.message}</p>
              )}
            </div>
          </div>

          <button type="submit" className="profile-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;