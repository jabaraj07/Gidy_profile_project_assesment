import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const PageLayout = ({ children }) => {
  const location = useLocation();
  // hide navbar on login/signup
  const hideNav = ["/login", "/signup"].includes(location.pathname);
  return (
    <>
      {!hideNav && <Navbar />}
      {children}
    </>
  );
};

export default PageLayout;
