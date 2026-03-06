import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import ExperienceForm from "./ExperienceForm";
import { DeleteExperience } from "../../api/userAuth";

const Section3 = ({ user, openAdd = false, onCloseAdd }) => {
  const experience = user?.experience || [];
  const { fetchUser } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [menuFor, setMenuFor] = useState(null); // index of experience showing menu

  const handleAdd = () => {
    setEditingExp(null);
    setShowForm(true);
  };

  const handleEdit = (exp) => {
    setEditingExp(exp);
    setShowForm(true);
    setMenuFor(null);
  };

  const handleDelete = async (id) => {
    try {
      await DeleteExperience(id);
      await fetchUser();
    } catch (err) {
      console.error("Failed to delete experience", err);
    }
    setMenuFor(null);
  };

    const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // open modal when parent requests
  useEffect(() => {
    if (openAdd) {
      setShowForm(true);
    }
  }, [openAdd]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Experience</h2>
        <button onClick={handleAdd}>➕</button>
      </div>

      {experience.length > 0 ? (
        experience.map((exp, idx) => (
          <div
            key={exp._id}
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
                <p>{exp.role}</p>
                <p>{exp.companyName}, {exp.location}</p>
                <p>
                  {formatDate(exp.dateOfJoining)} - {exp.currentlyWorking ? "Present" : formatDate(exp.dateOfLeaving)}
                </p>
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
                      onClick={() => handleEdit(exp)}
                    >
                      Edit experience
                    </div>
                    <div
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleDelete(exp._id)}
                    >
                      Delete{exp._id}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={handleAdd}>
          <p>Add Experience</p>
        </div>
      )}

      {showForm && (
        <ExperienceForm
          defaultValues={editingExp || {}}
          onClose={() => {
            setShowForm(false);
            if (onCloseAdd) onCloseAdd();
          }}
        />
      )}
    </div>
  );
};

export default Section3;
