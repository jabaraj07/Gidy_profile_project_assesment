import axiosInstance from "./axiosInstance";

export const AddCertification = (data) => {
  return axiosInstance.post(`/certification/add`, data);
};

export const UpdateCertification = (id, data) => {
  return axiosInstance.patch(`/certification/update/${id}`, data );
};

export const DeleteCertification = (id) => {
  return axiosInstance.delete(`/certification/delete/${id}` );
};