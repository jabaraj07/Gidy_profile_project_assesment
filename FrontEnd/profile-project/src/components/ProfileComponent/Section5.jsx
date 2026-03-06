import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/authContext";
import CertificationForm from "./CertificationForm";
import { DeleteCertification } from "../../api/userAuth";
import "../ProfileComponentStyles/Section4.css";

// ── Certificate / badge icon ──────────────────────────────────────────────────
const CertIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
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
          <div className={`${prefix}-dropdown__item`} onClick={() => { onEdit(); setOpen(false); }}>Edit certification</div>
          <div className={`${prefix}-dropdown__item ${prefix}-dropdown__item--danger`} onClick={() => { onDelete(); setOpen(false); }}>Delete</div>
        </div>
      )}
    </div>
  );
};

// ── Section5 ──────────────────────────────────────────────────────────────────
const Section5 = ({ user, openAdd = false, onCloseAdd }) => {
  const certifications = user?.certifications || [];
  const { fetchUser } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [editingCert, setEditingCert] = useState(null);

  const handleAdd = () => { setEditingCert(null); setShowForm(true); };
  const handleEdit = (cert) => { setEditingCert(cert); setShowForm(true); };
  const handleDelete = async (id) => {
    try { await DeleteCertification(id); await fetchUser(); }
    catch (err) { console.error("Failed to delete certification", err); }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  useEffect(() => { if (openAdd) setShowForm(true); }, [openAdd]);

  return (
    <div className="s5-container">
      {/* Header */}
      <div className="s5-header">
        <h2 className="s5-title">Certification</h2>
        <button className="s5-add-btn" onClick={handleAdd} aria-label="Add certification">+</button>
      </div>

      {certifications.length > 0 ? (
        certifications.map((cert) => (
          <div className="s5-item" key={cert._id}>
            <div className="s5-logo"><CertIcon /></div>
            <div className="s5-info">
              <p className="s5-primary">{cert.name}</p>
              <p className="s5-secondary">{cert.provider}</p>
              {cert.certificateId && (
                <p className="s5-meta">ID NO: {cert.certificateId}</p>
              )}
              {cert.issueDate && (
                <p className="s5-meta">Provided on: {formatDate(cert.issueDate)}</p>
              )}
            </div>
            <ItemMenu prefix="s5" onEdit={() => handleEdit(cert)} onDelete={() => handleDelete(cert._id)} />
          </div>
        ))
      ) : (
        <div className="s5-empty" onClick={handleAdd}>🏅 Add Your Certifications!</div>
      )}

      {showForm && (
        <CertificationForm
          defaultValues={editingCert || {}}
          onClose={() => { setShowForm(false); onCloseAdd?.(); }}
        />
      )}
    </div>
  );
};

export default Section5;