import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import EducationForm from "../Form/EducationForm";
import { DeleteEducation } from "../../../../api/educationApi";
import "./UserEducation.css";
import GradIcon from "../../../../components/icons/GradIcon";
import ItemMenu from "../../../../components/common/ItemMenu/ItemMenu";


const UserEducation = ({ user, openAdd = false, onCloseAdd }) => {
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

export default UserEducation;