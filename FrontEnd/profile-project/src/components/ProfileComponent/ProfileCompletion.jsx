import React from "react";
import { useAuth } from "../../context/authContext";

const items = [
  { key: "bio", label: "Complete Your Bio ✏️", bonus: 20 },
  { key: "education", label: "Add Your Education 🎓", bonus: 16 },
  { key: "skills", label: "Add Your Skills 🎯", bonus: 16 },
  { key: "certifications", label: "Upload Your Certificates 📜", bonus: 16 },
  { key: "experience", label: "Add Your Experience 💼", bonus: 16 },
  { key: "resume", label: "Upload Your Resume 📄", bonus: 16 },
];

// compute progress and section availability same as backend
const compute = (user) => {
  let progress = 0;
  const sections = {};
  if (user.profile.bio) {
    progress += 20;
    sections.bio = true;
  }
  if (user.education && user.education.length > 0) {
    progress += 16;
    sections.education = true;
  }
  if (user.skills && user.skills.length > 0) {
    progress += 16;
    sections.skills = true;
  }
  if (user.certifications && user.certifications.length > 0) {
    progress += 16;
    sections.certifications = true;
  }
  if (user.experience && user.experience.length > 0) {
    progress += 16;
    sections.experience = true;
  }
  if (user.profile.resume) {
    progress += 16;
    sections.resume = true;
  }
  return { progress, sections };
};

const ProfileCompletion = ({
  onAddBio,
  onAddEducation,
  onAddSkills,
  onAddCertifications,
  onAddExperience,
  onAddResume,
}) => {
  const { user } = useAuth();
  if (!user) return null;
  const { progress, sections } = compute(user);

  const handleClick = (key) => {
    switch (key) {
      case "bio":
        onAddBio && onAddBio();
        break;
      case "education":
        onAddEducation && onAddEducation();
        break;
      case "skills":
        onAddSkills && onAddSkills();
        break;
      case "certifications":
        onAddCertifications && onAddCertifications();
        break;
      case "experience":
        onAddExperience && onAddExperience();
        break;
      case "resume":
        onAddResume && onAddResume();
        break;
      default:
        break;
    }
  };

  // when everything is done display final message
  if (progress >= 100) {
    return (
      <div className="profile-section" style={{ marginBottom: "24px" }}>
        <h2>🎉 Profile Completed</h2>
        <p>Mission complete! Profile at 100% and you’re good to go!</p>
      </div>
    );
  }

  return (
    <div className="profile-section" style={{ marginBottom: "24px" }}>
      <h2>Level Up Profile</h2>
      <p>Just a few clicks away from awesomeness, complete your profile!</p>
      <div style={{ margin: "8px 0" }}>
        <div
          style={{
            height: "8px",
            background: "#eee",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "green",
            }}
          />
        </div>
        <p>Progress: {progress}%</p>
      </div>
      {items
        .filter((item) => !sections[item.key])
        .map((item) => (
          <div
            key={item.key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "8px",
              background: "#fff",
            }}
          >
            <div>
              <strong>{item.label}</strong>
              <span style={{ marginLeft: "8px", color: "green" }}>(+{item.bonus}%)</span>
            </div>
            <button
              style={{
                border: "none",
                background: "none",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
              onClick={() => handleClick(item.key)}
            >
              ➕
            </button>
          </div>
        ))}
    </div>
  );
};

export default ProfileCompletion;
