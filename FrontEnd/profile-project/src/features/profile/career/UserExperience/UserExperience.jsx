import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import ExperienceForm from "../Form/ExperienceForm";
import { DeleteExperience } from "../../../../api/experienceApi";
import "./UserExperience.css";
import BuildingIcon from "../../../../components/icons/BuildingIcon";
import ItemMenu from "../../../../components/common/ItemMenu/ItemMenu";

const UserExperience = ({ user, openAdd = false, onCloseAdd }) => {
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
            <ItemMenu prefix="s3" onEdit={() => handleEdit(exp)} onDelete={() => handleDelete(exp._id)} />
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

export default UserExperience;