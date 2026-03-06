import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { UpdateProfile } from "../../api/userAuth";
import "./EditProfileForm.css";

const ResumeUpload = ({ register, watch }) => {
  const resumeFile = watch("resume");
  const hasFile = resumeFile?.[0];

  return (
    <label
      className={`resume-upload${hasFile ? " has-file" : ""}`}
      htmlFor="resume"
    >
      <input
        id="resume"
        type="file"
        accept=".pdf,.doc,.docx"
        {...register("resume")}
      />
      <div className="resume-upload__icon">
        {hasFile ? (
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 16 12 12 8 16" />
            <line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
          </svg>
        )}
      </div>
      <span className="resume-upload__btn">
        {hasFile ? "✓ Resume Selected" : "Upload Resume"}
      </span>
      {hasFile && <p className="resume-upload__text">{hasFile.name}</p>}
    </label>
  );
};

const EditProfileForm = ({ user, closeForm }) => {
  const { setUser } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState(
    user?.profile?.profileImage || null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      lastName: user?.profile?.lastName || "",
      email: user?.email || "",
      location: user?.profile?.location || "",
      bio: user?.profile?.bio || "",
    },
  });

  const bioValue = watch("bio") || "";
  const BIO_MAX = 500;

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue("profileImage", e.target.files);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("lastName", data.lastName);
    formData.append("location", data.location);
    formData.append("bio", data.bio);

    if (data.profileImage && data.profileImage.length > 0) {
      formData.append("profileImage", data.profileImage[0]);
    }

    if (data.resume && data.resume.length > 0) {
      formData.append("resume", data.resume[0]);
    }
    try {
      const response = await UpdateProfile(formData);
      setUser(response.data.userDetails);
      closeForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="edit-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && closeForm()}
    >
      <div className="edit-modal">
        {/* ── Avatar ── */}
        <div className="edit-avatar-wrap">
          <div className="edit-avatar">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Profile"
                className="edit-avatar__img"
              />
            ) : (
              <div className="edit-avatar__placeholder">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            )}
            {/* Blue pencil badge */}
            <label
              htmlFor="profileImage"
              className="edit-avatar__badge"
              title="Change photo"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="edit-form__fields">
            {/* First Name */}
            <div className="edit-field">
              <label className="edit-field__label" htmlFor="name">
                First Name <span>*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`edit-field__input${errors.name ? " error" : ""}`}
                {...register("name", { required: "First name is required" })}
              />
              {errors.name && (
                <p className="edit-field__error">{errors.name.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="edit-field">
              <label className="edit-field__label" htmlFor="lastName">
                Last Name <span>*</span>
              </label>
              <input
                id="lastName"
                type="text"
                className={`edit-field__input${errors.lastName ? " error" : ""}`}
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="edit-field__error">{errors.lastName.message}</p>
              )}
            </div>

            {/* Email — read-only */}
            <div className="edit-field">
              <label className="edit-field__label" htmlFor="email">
                Email ID <span>*</span>
              </label>
              <input
                id="email"
                type="email"
                className="edit-field__input"
                disabled
                readOnly
                {...register("email")}
              />
            </div>

            {/* Location */}
            <div className="edit-field">
              <label className="edit-field__label" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                type="text"
                className="edit-field__input"
                {...register("location")}
              />
            </div>

            {/* Bio + character counter */}
            <div className="edit-field">
              <div className="edit-field__label-row">
                <label className="edit-field__label" htmlFor="bio">
                  Bio
                </label>
                <span className="edit-field__counter">
                  max character ({BIO_MAX} -{" "}
                  {Math.max(0, BIO_MAX - bioValue.length)})
                </span>
              </div>
              <textarea
                id="bio"
                className="edit-field__textarea"
                placeholder="Tell us about yourself…"
                maxLength={BIO_MAX}
                {...register("bio")}
              />
            </div>

            {/* Resume upload */}
            <ResumeUpload register={register} watch={watch} />
          </div>

          {/* Actions */}
          <div className="edit-form__actions">
            <button
              type="button"
              className="edit-btn--cancel"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="edit-btn--save"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving…" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
