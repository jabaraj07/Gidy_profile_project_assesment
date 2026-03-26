import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingComponent/>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
