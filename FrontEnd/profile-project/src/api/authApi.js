import axiosInstance from "./axiosInstance";

export const loginUser = (data) => {
  return axiosInstance.post("/auth/login", data);
};

export const SignupUser = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const getCurrentUser = () => {
  return axiosInstance.get("/auth/me");
};

export const logoutUser = () => {
  return axiosInstance.post("/auth/logout", {});
};
