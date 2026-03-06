import React, { useState, useEffect } from "react";
import SkillForm from "./SkillForm";

const Section6 = ({ user, openAdd = false, onCloseAdd }) => {
  const skills = user?.skills || [];
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setShowForm(true);
  };

  useEffect(() => {
    if (openAdd) setShowForm(true);
  }, [openAdd]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Skills</h2>
        <button onClick={handleAdd}>➕</button>
      </div>
      {skills.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {skills.map((s) => (
            <span
              key={s}
              style={{
                background: "#e0e0e0",
                padding: "4px 8px",
                borderRadius: "12px",
                fontSize: "0.9rem",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      ) : (
        <div
          style={{ textAlign: "center", cursor: "pointer", margin: "8px 0" }}
          onClick={handleAdd}
        >
          <p>➕ Add Your Skills!</p>
        </div>
      )}

      {showForm && (
        <SkillForm
          defaultValues={skills}
          onClose={() => {
            setShowForm(false);
            if (onCloseAdd) onCloseAdd();
          }}
        />
      )}
    </div>
  );
};

export default Section6;
