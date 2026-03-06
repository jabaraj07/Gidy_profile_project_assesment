// import React, { useState, useEffect } from "react";
// import SkillForm from "./SkillForm";

// const Section6 = ({ user, openAdd = false, onCloseAdd }) => {
//   const skills = user?.skills || [];
//   const [showForm, setShowForm] = useState(false);

//   const handleAdd = () => {
//     setShowForm(true);
//   };

//   useEffect(() => {
//     if (openAdd) setShowForm(true);
//   }, [openAdd]);

//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <h2>Skills</h2>
//         <button onClick={handleAdd}>➕</button>
//       </div>
//       {skills.length > 0 ? (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//           {skills.map((s) => (
//             <span
//               key={s}
//               style={{
//                 background: "#e0e0e0",
//                 padding: "4px 8px",
//                 borderRadius: "12px",
//                 fontSize: "0.9rem",
//               }}
//             >
//               {s}
//             </span>
//           ))}
//         </div>
//       ) : (
//         <div
//           style={{ textAlign: "center", cursor: "pointer", margin: "8px 0" }}
//           onClick={handleAdd}
//         >
//           <p>➕ Add Your Skills!</p>
//         </div>
//       )}

//       {showForm && (
//         <SkillForm
//           defaultValues={skills}
//           onClose={() => {
//             setShowForm(false);
//             if (onCloseAdd) onCloseAdd();
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Section6;









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