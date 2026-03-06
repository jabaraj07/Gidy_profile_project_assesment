import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/authContext";
import EducationForm from "./EducationForm";
import { DeleteEducation } from "../../api/userAuth";
import "../ProfileComponentStyles/Section4.css";

// ── Graduation cap icon ───────────────────────────────────────────────────────
const GradIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
    <path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5"/>
  </svg>
);

// ── Per-item dropdown menu ────────────────────────────────────────────────────
const ItemMenu = ({ prefix, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className={`${prefix}-menu-wrap`} ref={ref}>
      <button className={`${prefix}-menu-btn`} onClick={() => setOpen(p => !p)} aria-label="More options">⋮</button>
      {open && (
        <div className={`${prefix}-dropdown`}>
          <div className={`${prefix}-dropdown__item`} onClick={() => { onEdit(); setOpen(false); }}>Edit education</div>
          <div className={`${prefix}-dropdown__item ${prefix}-dropdown__item--danger`} onClick={() => { onDelete(); setOpen(false); }}>Delete</div>
        </div>
      )}
    </div>
  );
};

// ── Section4 ──────────────────────────────────────────────────────────────────
const Section4 = ({ user, openAdd = false, onCloseAdd }) => {
  const education = user?.education || [];
  const { fetchUser } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);

  const handleAdd = () => { setEditingEdu(null); setShowForm(true); };
  const handleEdit = (edu) => { setEditingEdu(edu); setShowForm(true); };
  const handleDelete = async (id) => {
    try { await DeleteEducation(id); await fetchUser(); }
    catch (err) { console.error("Failed to delete education", err); }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  useEffect(() => { if (openAdd) setShowForm(true); }, [openAdd]);

  return (
    <div className="s4-container">
      {/* Header */}
      <div className="s4-header">
        <h2 className="s4-title">Education</h2>
        <button className="s4-add-btn" onClick={handleAdd} aria-label="Add education">+</button>
      </div>

      {education.length > 0 ? (
        education.map((edu) => (
          <div className="s4-item" key={edu._id}>
            <div className="s4-logo"><GradIcon /></div>
            <div className="s4-info">
              <p className="s4-primary">{edu.collegeName}{edu.location ? `, ${edu.location}` : ""}</p>
              {edu.degree && (
                <p className="s4-secondary">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</p>
              )}
              <p className="s4-meta">
                {formatDate(edu.dateOfJoining)}
                {" – "}
                {edu.currentlyStudying ? "Present" : formatDate(edu.dateOfCompletion)}
              </p>
            </div>
            <ItemMenu prefix="s4" onEdit={() => handleEdit(edu)} onDelete={() => handleDelete(edu._id)} />
          </div>
        ))
      ) : (
        <div className="s4-empty" onClick={handleAdd}>🎓 Add Your Education!</div>
      )}

      {showForm && (
        <EducationForm
          defaultValues={editingEdu || {}}
          onClose={() => { setShowForm(false); onCloseAdd?.(); }}
        />
      )}
    </div>
  );
};

export default Section4;