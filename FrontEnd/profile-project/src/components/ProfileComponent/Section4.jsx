import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import EducationForm from "./EducationForm";
import { DeleteEducation } from "../../api/userAuth";

const Section4 = ({ user, openAdd = false, onCloseAdd }) => {
  const education = user?.education || [];
  const { fetchUser } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [menuFor, setMenuFor] = useState(null);

  const handleAdd = () => {
    setEditingEdu(null);
    setShowForm(true);
  };

  const handleEdit = (edu) => {
    setEditingEdu(edu);
    setShowForm(true);
    setMenuFor(null);
  };

  const handleDelete = async (id) => {
    try {
      await DeleteEducation(id);
      await fetchUser();
    } catch (err) {
      console.error("Failed to delete education", err);
    }
    setMenuFor(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  useEffect(() => {
    if (openAdd) setShowForm(true);
  }, [openAdd]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Education</h2>
        <button onClick={handleAdd}>➕</button>
      </div>

      {education.length > 0 ? (
        education.map((edu, idx) => (
          <div
            key={edu._id}
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
                <p>{edu.collegeName}, {edu.location}</p>
                {/* <p>{edu.degree} in {edu.fieldOfStudy}</p> */}
                {/* <p>{edu.location}</p> */}
                <p>
                  {formatDate(edu.dateOfJoining)} - {edu.currentlyStudying ? "Present" : formatDate(edu.dateOfCompletion)}
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
                      onClick={() => handleEdit(edu)}
                    >
                      Edit education
                    </div>
                    <div
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleDelete(edu._id)}
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
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={handleAdd}>
          <p>Add Education</p>
        </div>
      )}

      {showForm && (
        <EducationForm
          defaultValues={editingEdu || {}}
          onClose={() => {
            setShowForm(false);
            if (onCloseAdd) onCloseAdd();
          }}
        />
      )}
    </div>
  );
};

export default Section4;
