import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { addProfile } from "../../api/profileApi";
import { useNavigate } from "react-router-dom";
import "./ProfileForm.css";
import CameraIcon from "../../components/icons/CameraIcon";
import ProfileIcon from "../../components/icons/ProfileIcon";
import InputField from "../../components/common/InputField";
import SelectInput from "../../components/common/SelectInput";
import Button from "../../components/common/Button";

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

  const Describe = [
    { label: "Job Seeker", value: "jobseeker" },
    { label: "Intern", value: "intern" },
    { label: "Student", value: "student" },
    { label: "Recruiter", value: "recruiter" },
    { label: "Freelancer", value: "freelancer" },
  ];

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
                  <ProfileIcon />
                )}
              </div>
              <div className="profile-avatar__camera">
                {/* Camera icon */}
                <CameraIcon />
              </div>
            </div>
            <p className="profile-avatar__label">
              Click to upload your profile picture
            </p>
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
              <InputField
                label="First Name"
                spanElement="*"
                name="name"
                register={register}
                errors={errors}
                rules={{ required: "First Name is Required" }}
                className="profile-field__input"
                errorClassName="profile-field__error"
                labelClassName="profile-field__label"
              />
            </div>

            {/* Last Name */}
            <div className="profile-field">
              <InputField
                label="Last Name"
                spanElement="*"
                name="lastName"
                register={register}
                errors={errors}
                rules={{ required: "Last Name is Required" }}
                className="profile-field__input"
                errorClassName="profile-field__error"
                labelClassName="profile-field__label"
              />
            </div>

            {/* What Best Describes You */}
            <div className="profile-field">
              <SelectInput
                label="What Best Describes You?"
                spanElement="*"
                name="Describe"
                rules={{ required: "Please select an option" }}
                register={register}
                options={Describe}
                errors={errors}
                defaultValue="Select an option"
                errorClassName="profile-field__error"
                optionsDivClassName="profile-field__select-wrap"
                SelectClass="profile-field__select"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="profile-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving…" : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
