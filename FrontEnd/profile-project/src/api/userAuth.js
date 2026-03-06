import axiosInstance from "./axiosInstance";

export const loginUser = (data) => {
  // need to send credentials so the httpOnly cookie from the server is stored
  return axiosInstance.post("/auth/login", data, { withCredentials: true });
};

export const SignupUser = (data) => {
  return axiosInstance.post("/auth/register", data, { withCredentials: true });
};

export const getCurrentUser = () => {
  return axiosInstance.get("/auth/me", { withCredentials: true });
};

export const addProfile = (data) => {
  return axiosInstance.patch("/auth/profile", data,{ withCredentials: true });
};

export const AddCareer = (data) => {
  return axiosInstance.patch("/auth/career", data,{ withCredentials: true });
};

export const UpdateProfile = (data) => {
  return axiosInstance.patch("/auth/update-profile", data,{ withCredentials: true });
};

export const AddExperience = (data) => {
  return axiosInstance.post("/experience/add", data, { withCredentials: true });
};

export const UpdateExperience = (id, data) => {
  return axiosInstance.patch(`/experience/Update/${id}`, data, { withCredentials: true });
};

export const DeleteExperience = (id) => {
  return axiosInstance.delete(`/experience/delete/${id}`, { withCredentials: true });
};

export const AddEducation = (data) => {
  return axiosInstance.post(`/education/add`, data, { withCredentials: true });
};

export const UpdateEducation = (id, data) => {
  return axiosInstance.patch(`/education/update/${id}`, data, { withCredentials: true });
};

export const DeleteEducation = (id) => {
  return axiosInstance.delete(`/education/delete/${id}`, { withCredentials: true });
};

export const AddCertification = (data) => {
  return axiosInstance.post(`/certification/add`, data, { withCredentials: true });
};

export const UpdateCertification = (id, data) => {
  return axiosInstance.patch(`/certification/update/${id}`, data, { withCredentials: true });
};

export const DeleteCertification = (id) => {
  return axiosInstance.delete(`/certification/delete/${id}`, { withCredentials: true });
};

export const UpdateSkills = (skills) => {
  return axiosInstance.post("/auth/update-skills", { skills }, { withCredentials: true });
};

export const logoutUser = () => {
  return axiosInstance.post("/auth/logout", {}, { withCredentials: true });
};
