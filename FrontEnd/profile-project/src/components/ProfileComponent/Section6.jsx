import React, { useState, useEffect } from "react";
import SkillForm from "./SkillForm";
import "../ProfileComponentStyles/Section6.css";

const Section6 = ({ user, openAdd = false, onCloseAdd }) => {
  const skills = user?.skills || [];
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => setShowForm(true);

  useEffect(() => {
    if (openAdd) setShowForm(true);
  }, [openAdd]);

  return (
    <div className="s6-container">
      {/* Header */}
      <div className="s6-header">
        <h2 className="s6-title">Skills</h2>
        <button className="s6-add-btn" onClick={handleAdd} aria-label="Add skills">+</button>
      </div>

      {/* Chips or empty state */}
      {skills.length > 0 ? (
        <div className="s6-chips">
          {skills.map((s) => (
            <span key={s} className="s6-chip">{s}</span>
          ))}
        </div>
      ) : (
        <div className="s6-empty" onClick={handleAdd}>
          💡 Add Your Skills!
        </div>
      )}

      {/* Skill form modal */}
      {showForm && (
        <SkillForm
          defaultValues={skills}
          onClose={() => {
            setShowForm(false);
            onCloseAdd?.();
          }}
        />
      )}
    </div>
  );
};

export default Section6;