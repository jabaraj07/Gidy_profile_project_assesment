import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log("Protected route user : ",user)

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
