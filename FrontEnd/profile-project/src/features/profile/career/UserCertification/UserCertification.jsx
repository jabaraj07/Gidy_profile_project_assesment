import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import CertificationForm from "../Form/CertificationForm";
import { DeleteCertification } from "../../../../api/certificationApi";
import "./UserCertification.css";
import CertIcon from "../../../../components/icons/CertIcon";
import ItemMenu from "../../../../components/common/ItemMenu/ItemMenu";

const UserCertification = ({ user, openAdd = false, onCloseAdd }) => {
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

export default UserCertification;