import axiosInstance from "./axiosInstance";

export const AddExperience = (data) => {
  return axiosInstance.post("/experience/add", data);
};

export const UpdateExperience = (id, data) => {
  return axiosInstance.patch(`/experience/Update/${id}`, data);
};

export const DeleteExperience = (id) => {
  return axiosInstance.delete(`/experience/delete/${id}` );
};