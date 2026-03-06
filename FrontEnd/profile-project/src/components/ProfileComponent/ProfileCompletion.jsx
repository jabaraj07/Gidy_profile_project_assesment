import React from "react";
import { useAuth } from "../../context/authContext";
import "../ProfileComponentStyles/ProfileCompletion.css";

const items = [
  {
    key: "bio",
    label: "Complete Your Bio",
    emoji: "✏️",
    bonus: 20,
    desc: "Tell others who you are and what you do.",
  },
  {
    key: "experience",
    label: "Add Your Experience",
    emoji: "💼",
    bonus: 16,
    desc: "Showcase your work history and professional background.",
  },
  {
    key: "education",
    label: "Add Your Education",
    emoji: "🎓",
    bonus: 16,
    desc: "Share your academic background and qualifications.",
  },
  {
    key: "skills",
    label: "Add Your Skills",
    emoji: "🎯",
    bonus: 16,
    desc: "Highlight the technologies and tools you work with.",
  },
  {
    key: "certifications",
    label: "Upload Your Certificates",
    emoji: "📜",
    bonus: 16,
    desc: "Add certifications to validate your expertise.",
  },
  {
    key: "resume",
    label: "Upload Your Resume",
    emoji: "📄",
    bonus: 16,
    desc: "Attach your resume so recruiters can find you easily.",
  },
];

const compute = (user) => {
  let progress = 0;
  const sections = {};
  if (user.profile?.bio)                        { progress += 20; sections.bio = true; }
  if (user.education?.length > 0)               { progress += 16; sections.education = true; }
  if (user.skills?.length > 0)                  { progress += 16; sections.skills = true; }
  if (user.certifications?.length > 0)          { progress += 16; sections.certifications = true; }
  if (user.experience?.length > 0)              { progress += 16; sections.experience = true; }
  if (user.profile?.resume)                     { progress += 16; sections.resume = true; }
  return { progress, sections };
};

const ProfileCompletion = ({
  onAddBio, onAddEducation, onAddSkills,
  onAddCertifications, onAddExperience, onAddResume,
}) => {
  const { user } = useAuth();
  if (!user) return null;

  const { progress, sections } = compute(user);

  const handleClick = (key) => {
    const map = {
      bio: onAddBio,
      education: onAddEducation,
      skills: onAddSkills,
      certifications: onAddCertifications,
      experience: onAddExperience,
      resume: onAddResume,
    };
    map[key]?.();
  };

  if (progress >= 100) {
    return (
      <div className="pc-container">
        <div className="pc-complete">
          <p className="pc-complete__title">🎉 Profile Complete!</p>
          <p className="pc-complete__text">Mission complete! Profile at 100% — you're good to go!</p>
        </div>
      </div>
    );
  }

  const pending = items.filter((item) => !sections[item.key]);

  return (
    <div className="pc-container">
      {/* Header */}
      <p className="pc-title">🎓 Level Up Profile</p>
      <p className="pc-subtitle">Just a few clicks away from awesomeness, complete your profile!</p>

      {/* Progress bar */}
      <div className="pc-progress-wrap">
        <div className="pc-bar-track">
          <div className="pc-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="pc-progress-label">Progress: {progress}%</p>
      </div>

      {/* Pending items */}
      {pending.map((item) => (
        <div className="pc-item" key={item.key}>
          <div className="pc-item__info">
            <span className="pc-item__label">
              {item.label} {item.emoji}
              <span className="pc-item__bonus">(+{item.bonus}%)</span>
            </span>
            <p className="pc-item__desc">{item.desc}</p>
          </div>
          <button
            className="pc-item__btn"
            onClick={() => handleClick(item.key)}
            aria-label={`Add ${item.label}`}
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProfileCompletion;