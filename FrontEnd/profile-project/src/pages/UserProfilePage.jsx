import React, { useState } from "react";
import Section1 from "../components/ProfileComponent/Section1";
import { useAuth } from "../context/authContext";
import EditProfileForm from "../components/ProfileComponent/EditProfileForm";
import Section2 from "../components/ProfileComponent/Section2";
import CareerForm from "../features/auth/CareerForm";
import Section3 from "../components/ProfileComponent/Section3";
import Section4 from "../components/ProfileComponent/Section4";
import Section5 from "../components/ProfileComponent/Section5";
import Section6 from "../components/ProfileComponent/Section6";
import ProfileCompletion from "../components/ProfileComponent/ProfileCompletion";

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
    <div>
      <Section1
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
        <Section2 user={user} onEdit={() => setShowCareerForm(true)} />
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
          <Section3
            user={user}
            openAdd={openExperienceForm}
            onCloseAdd={() => setOpenExperienceForm(false)}
          />
        </div>

        <div className="profile-section">
          <Section4
            user={user}
            openAdd={openEducationForm}
            onCloseAdd={() => setOpenEducationForm(false)}
          />
        </div>

        <div className="profile-section">
          <Section5
            user={user}
            openAdd={openCertificationForm}
            onCloseAdd={() => setOpenCertificationForm(false)}
          />
        </div>

        <div className="profile-section">
          <Section6
            user={user}
            openAdd={openSkillForm}
            onCloseAdd={() => setOpenSkillForm(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
