import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/userAuth";
import { useAuth } from "../context/authContext";

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
    <nav style={styles.nav}>
      <div style={styles.logo}>Gidy</div>
      <button style={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 16px",
    background: "#fff",
    borderBottom: "1px solid #ddd",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  logout: {
    padding: "6px 12px",
    borderRadius: "4px",
    border: "1px solid #333",
    background: "none",
    cursor: "pointer",
  },
};

export default Navbar;
