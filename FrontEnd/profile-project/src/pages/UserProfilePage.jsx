import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import EditProfileForm from "../features/profile/personalDetails/EditProfileForm";
import CareerForm from "../features/onboarding/CareerForm";
import ProfileCompletion from "../features/profile/ProfileCompletionDetails/ProfileCompletion";
import CareerGoals from "../features/profile/career/CareerGoals/CareerGoals";
import UserDetails from "../features/profile/personalDetails/UserDetails";
import UserExperience from "../features/profile/career/UserExperience/UserExperience";
import UserEducation from "../features/profile/career/UserEducation/UserEducation";
import UserCertification from "../features/profile/career/UserCertification/UserCertification";
import UserSkills from "../features/profile/career/UserSkills/UserSkills";

const UserProfilePage = () => {
  const { user } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [showCareerForm, setShowCareerForm] = useState(false);

  // states for completion-driven modals
  const [openEducationForm, setOpenEducationForm] = useState(false);
  const [openExperienceForm, setOpenExperienceForm] = useState(false);
  const [openCertificationForm, setOpenCertificationForm] = useState(false);
  const [openSkillForm, setOpenSkillForm] = useState(false);

  // console.log("In userProfile-Page : ", user);

  return (
    <>
      <UserDetails
        user={user}
        openEditForm={() => setOpenEdit(true)}
      />

      <ProfileCompletion
        onAddBio={() => setOpenEdit(true)}
        onAddEducation={() => setOpenEducationForm(true)}
        onAddSkills={() => setOpenSkillForm(true)}
        onAddCertifications={() => setOpenCertificationForm(true)}
        onAddExperience={() => setOpenExperienceForm(true)}
        onAddResume={() => setOpenEdit(true)}
      />

      {openEdit && (
        <EditProfileForm
          user={user}
          closeForm={() => setOpenEdit(false)}
        />
      )}

      <div className="profile-section">
        <CareerGoals user={user} onEdit={() => setShowCareerForm(true)} />
      </div>

      {showCareerForm && (
        <CareerForm
          mode="edit"
          onClose={() => setShowCareerForm(false)}
          defaultValues={user?.careerGoals}
        />
      )}

      <div className="profile-sections">
        <div className="profile-section">
          <UserExperience
            user={user}
            openAdd={openExperienceForm}
            onCloseAdd={() => setOpenExperienceForm(false)}
          />
        </div>

        <div className="profile-section">
          <UserEducation
            user={user}
            openAdd={openEducationForm}
            onCloseAdd={() => setOpenEducationForm(false)}
          />
        </div>

        <div className="profile-section">
          <UserCertification
            user={user}
            openAdd={openCertificationForm}
            onCloseAdd={() => setOpenCertificationForm(false)}
          />
        </div>

        <div className="profile-section">
          <UserSkills
            user={user}
            openAdd={openSkillForm}
            onCloseAdd={() => setOpenSkillForm(false)}
          />
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;