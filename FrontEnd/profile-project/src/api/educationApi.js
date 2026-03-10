import axiosInstance from "./axiosInstance";

export const AddEducation = (data) => {
  return axiosInstance.post(`/education/add`, data);
};

export const UpdateEducation = (id, data) => {
  return axiosInstance.patch(`/education/update/${id}`, data);
};

export const DeleteEducation = (id) => {
  return axiosInstance.delete(`/education/delete/${id}`);
};