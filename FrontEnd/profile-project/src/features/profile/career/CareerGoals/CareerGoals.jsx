import React from "react";
import "./CareerGoals.css";

const CareerGoals = ({ user, onEdit }) => {
  const career = user?.careerGoals;

  const isCareerEmpty =
    !career?.longTermAspiration &&
    !career?.aspirationalField &&
    !career?.inspiration &&
    !career?.currentAim;

  return (
    <div className="s2-container">

      {/* Sparkle badge — top right */}
      <div className="s2-sparkle" onClick={onEdit} title="Edit career goals">
        ✦
      </div>

      {isCareerEmpty ? (
        /* ── Empty state ── */
        <>
          <h3 className="s2-empty-title">Tell us where you want to go</h3>
          <p className="s2-empty-text">
            Add your career goals and what inspires you. This helps us tailor
            recommendations, learning paths, and opportunities just for you.
          </p>
          <button className="s2-add-btn" onClick={onEdit}>
            + Add your career goals
          </button>
        </>
      ) : (
        /* ── Filled state ── */
        <>
          {/* Career vision */}
          <p className="s2-vision-label">You're Career Vision</p>
          <h2 className="s2-vision-value">
            {career?.longTermAspiration || "—"}
          </h2>

          <hr className="s2-divider" />

          {/* Stats row */}
          <div className="s2-stats">
            <div className="s2-stat">
              <p className="s2-stat__label">What you're growing into right now</p>
              <p className="s2-stat__value">{career?.currentAim || "—"}</p>
            </div>

            <div className="s2-stat">
              <p className="s2-stat__label">The space you want to grow in</p>
              <p className="s2-stat__value">{career?.aspirationalField || "—"}</p>
            </div>

            <div className="s2-stat">
              <p className="s2-stat__label">Inspired by</p>
              <p className="s2-stat__value">{career?.inspiration || "—"}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CareerGoals;