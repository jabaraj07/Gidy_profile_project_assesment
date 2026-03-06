import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/authContext";
import ExperienceForm from "./ExperienceForm";
import { DeleteExperience } from "../../api/userAuth";
import "../ProfileComponentStyles/Section3.css";

// ── Building icon ─────────────────────────────────────────────────────────────
const BuildingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 3v18M15 3v18M3 9h6M3 15h6M15 9h6M15 15h6"/>
  </svg>
);

// ── Item menu ─────────────────────────────────────────────────────────────────
const ItemMenu = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="s3-menu-wrap" ref={ref}>
      <button className="s3-menu-btn" onClick={() => setOpen((p) => !p)} aria-label="More options">⋮</button>
      {open && (
        <div className="s3-dropdown">
          <div className="s3-dropdown__item" onClick={() => { onEdit(); setOpen(false); }}>Edit experience</div>
          <div className="s3-dropdown__item s3-dropdown__item--danger" onClick={() => { onDelete(); setOpen(false); }}>Delete</div>
        </div>
      )}
    </div>
  );
};

// ── Section3 ──────────────────────────────────────────────────────────────────
const Section3 = ({ user, openAdd = false, onCloseAdd }) => {
  const experience = user?.experience || [];
  const { fetchUser } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  const handleAdd = () => { setEditingExp(null); setShowForm(true); };
  const handleEdit = (exp) => { setEditingExp(exp); setShowForm(true); };
  const handleDelete = async (id) => {
    try {
      await DeleteExperience(id);
      await fetchUser();
    } catch (err) {
      console.error("Failed to delete experience", err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  useEffect(() => {
    if (openAdd) setShowForm(true);
  }, [openAdd]);

  return (
    <div className="s3-container">
      {/* Header */}
      <div className="s3-header">
        <h2 className="s3-title">Experience</h2>
        <button className="s3-add-btn" onClick={handleAdd} aria-label="Add experience">+</button>
      </div>

      {/* List or empty */}
      {experience.length > 0 ? (
        experience.map((exp) => (
          <div className="s3-item" key={exp._id}>
            {/* Logo */}
            <div className="s3-logo"><BuildingIcon /></div>

            {/* Info */}
            <div className="s3-info">
              <p className="s3-role">{exp.role}</p>
              <p className="s3-company">{exp.companyName}{exp.location ? `, ${exp.location}` : ""}</p>
              <p className="s3-dates">
                Started: {formatDate(exp.dateOfJoining)}
                {" - "}
                {exp.currentlyWorking ? "Present" : `Ended: ${formatDate(exp.dateOfLeaving)}`}
              </p>
            </div>

            {/* Menu */}
            <ItemMenu onEdit={() => handleEdit(exp)} onDelete={() => handleDelete(exp._id)} />
          </div>
        ))
      ) : (
        <div className="s3-empty" onClick={handleAdd}>
          🔥 Add Your Experiences!
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <ExperienceForm
          defaultValues={editingExp || {}}
          onClose={() => { setShowForm(false); onCloseAdd?.(); }}
        />
      )}
    </div>
  );
};

export default Section3;