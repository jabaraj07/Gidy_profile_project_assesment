import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authApi";
import { useAuth } from "../../context/authContext";
import "./Navbar.css"

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed", err);
    }
    // clear context and redirect
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="logo">Gidy</div>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};
export default Navbar