const calculateProfileCompletion = (user) => {
//   console.log(user);
  let progress = 0;
  let sections = {
    bio: false,
    education: false,
    skills: false,
    certifications: false,
    experience: false,
    resume: false,
  };
  if (user.profile.bio) {
    progress += 20;
    sections["bio"] = true;
  }

  if (user.education && user.education.length > 0) {
    progress += 16;
    sections["education"] = true;
  }

  if (user.skills && user.skills.length > 0) {
    progress += 16;
    sections["skills"] = true;
  }

  if (user.certifications && user.certifications.length > 0) {
    progress += 16;
    sections["certifications"] = true;
  }

  if (user.experience && user.experience.length > 0) {
    progress += 16;
    sections["experience"] = true;
  }

  if (user.profile.resume) {
    progress += 16;
    sections["resume"] = true;
  }

  return { progress, sections };
};

module.exports = calculateProfileCompletion;
