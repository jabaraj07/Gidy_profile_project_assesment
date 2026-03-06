import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import CertificationForm from "./CertificationForm";
import { DeleteCertification } from "../../api/userAuth";

const Section5 = ({ user, openAdd = false, onCloseAdd }) => {
  const certifications = user?.certifications || [];
  const { fetchUser } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [menuFor, setMenuFor] = useState(null);

  const handleAdd = () => {
    setEditingCert(null);
    setShowForm(true);
  };
  const handleEdit = (cert) => {
    setEditingCert(cert);
    setShowForm(true);
    setMenuFor(null);
  };
  const handleDelete = async (id) => {
    try {
      await DeleteCertification(id);
      await fetchUser();
    } catch (err) {
      console.error("Failed to delete certification", err);
    }
    setMenuFor(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (openAdd) setShowForm(true);
  }, [openAdd]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Certification</h2>
        <button onClick={handleAdd}>➕</button>
      </div>

      {certifications.length > 0 ? (
        certifications.map((cert, idx) => (
          <div
            key={cert._id}
            style={{ display: "flex", marginTop: "5px", alignItems: "center" }}
          >
            <div>
              <p>Logo</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>
                <p>{cert.name}</p>
                <p>{cert.provider}</p>
                <p>{cert.certificateId && `ID NO: ${cert.certificateId}`}</p>
                {cert.issueDate && (
                  <p>Provided on: {formatDate(cert.issueDate)}</p>
                )}
              </div>
              <div style={{ position: "relative" }}>
                <button onClick={() => setMenuFor(idx)}>:</button>
                {menuFor === idx && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      background: "white",
                      border: "1px solid #ccc",
                      padding: "4px",
                    }}
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(cert)}
                    >
                      Edit certification
                    </div>
                    <div
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleDelete(cert._id)}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={handleAdd}
        >
          <p>Add Certification</p>
        </div>
      )}

      {showForm && (
        <CertificationForm
          defaultValues={editingCert || {}}
          onClose={() => {
            setShowForm(false);
            if (onCloseAdd) onCloseAdd();
          }}
        />
      )}
    </div>
  );
};

export default Section5;
