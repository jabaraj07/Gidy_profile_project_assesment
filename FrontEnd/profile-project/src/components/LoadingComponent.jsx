import React from "react";
import "./LoadingComponent.css";

const LoadingComponent = () => {
  return (
    <div className="profile-skeleton">
      <div className="skeleton avatar"></div>
      <div className="skeleton line short"></div>
      <div className="skeleton line"></div>
      <div className="skeleton line"></div>
    </div>
  );
};

export default LoadingComponent;
