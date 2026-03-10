import axiosInstance from "./axiosInstance";

export const addProfile = (data) => {
  return axiosInstance.patch("/auth/profile", data);
};

export const AddCareer = (data) => {
  return axiosInstance.patch("/auth/career", data);
};

export const UpdateProfile = (data) => {
  return axiosInstance.patch("/auth/update-profile", data);
};

export const UpdateSkills = (skills) => {
  return axiosInstance.post("/auth/update-skills", { skills });
};


