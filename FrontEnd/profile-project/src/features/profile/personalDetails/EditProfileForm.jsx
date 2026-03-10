import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/authContext";
import "./EditProfileForm.css";
import { UpdateProfile } from "../../../api/profileApi";
import CheckIcon from "../../../components/icons/CheckIcon";
import UploadIcon from "../../../components/icons/UploadIcon";
import ProfileIcon from "../../../components/icons/ProfileIcon";
import EditPencilIcon from "../../../components/icons/EditPencilIcon";

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
          <CheckIcon/>
        ) : (
          <UploadIcon/>
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
                <ProfileIcon/>
              </div>
            )}
            {/* Blue pencil badge */}
            <label
              htmlFor="profileImage"
              className="edit-avatar__badge"
              title="Change photo"
            >
              <EditPencilIcon/>
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
