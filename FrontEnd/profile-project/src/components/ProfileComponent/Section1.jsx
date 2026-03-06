import React, { useState, useRef, useEffect } from "react";
import "../ProfileComponentStyles/Section1.css";

const Section1 = ({ user, openEditForm }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const profile = user.profile || {};

  return (
    <div className="s1-container">
      {/* ── Header ── */}
      <div className="s1-header">
        <div className="s1-header__left">
          {/* Avatar */}
          <img
            src={profile.profileImage || "/default-avatar.png"}
            alt="profile"
            className="s1-avatar"
          />

          {/* Name / role / location */}
          <div className="s1-identity">
            <div className="s1-name-row">
              <h2 className="s1-name">
                {user.name} {profile.lastName || ""}
              </h2>
              {profile.whatBestDescribeYou && (
                <p className="s1-role">( {profile.whatBestDescribeYou} )</p>
              )}
            </div>
            <p className="s1-location">
              {profile.location || "Add your location"}
            </p>
          </div>
        </div>

        {/* Three-dot menu */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            className="s1-menu-btn"
            onClick={() => setShowDropDown((p) => !p)}
            aria-label="More options"
          >
            ⋮
          </button>

          {showDropDown && (
            <div className="s1-dropdown">
              <div
                className="s1-dropdown__item"
                onClick={() => {
                  openEditForm();
                  setShowDropDown(false);
                }}
              >
                Edit Profile
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Bio ── */}
      <p className={`s1-bio${!profile.bio ? " s1-bio--empty" : ""}`}>
        {profile.bio || "Add a bio to tell others about yourself"}
      </p>

      {/* ── Footer ── */}
      <div className="s1-footer">
        {/* Email */}
        <a href={`mailto:${user.email}`} className="s1-email">
          {/* Mail icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          {user.email}
        </a>

        {/* Download Resume */}
        {profile.resume && (
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="s1-resume-btn"
          >
            {/* Download icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Resume
          </a>
        )}
      </div>
    </div>
  );
};

export default Section1;