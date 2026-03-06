import React, { useState } from "react";

const Section1 = ({ user, openEditForm }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  if (!user) return null;

  const profile = user.profile || {};

  console.log("profile Data : ", profile);

  // const handleDownload = async () => {
  //   try {
  //     const response = await fetch(profile.resume);
  //     const blob = await response.blob();

  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "resume.pdf";
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();

  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Download failed", error);
  //   }
  // };

  return (
    <div style={styles.container}>
      {/* Top Section */}
      <div style={styles.header}>
        <div style={styles.left}>
          <img
            src={user.profile.profileImage || "/default-avatar.png"}
            alt="profile"
            style={styles.image}
          />

          <div>
            <div style={{ display: "flex" }}>
              <h2 style={styles.name}>
                {user.name} {profile.lastName || ""}
              </h2>
              <h3>{`(${profile.whatBestDescribeYou})`}</h3>
            </div>
            <p style={styles.location}>
              {profile.location || "Add your location"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDropDown(!showDropDown)}
          style={styles.menu}
        >
          ⋮
        </button>
      </div>

      {showDropDown && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 40,
            background: "#fff",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              openEditForm();
              setShowDropDown(false);
            }}
          >
            Edit Profile
          </p>
        </div>
      )}

      {/* Bio */}
      <div style={styles.bioSection}>
        <p style={styles.bio}>
          {profile.bio || "Add a bio to tell about yourself"}
        </p>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>{user.email}</p>

        {profile.resume ? (
          <>
            {/* <a href={profile.resume} target="_blank" rel="noopener noreferrer">
              <button style={styles.resumeBtn}>Download Resume</button>
            </a> */}

            <button>Download Resume</button>
          </>
        ) : ""}
      </div>
    </div>
  );
};

export default Section1;

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  image: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  name: {
    margin: 0,
  },

  location: {
    color: "gray",
    marginTop: "4px",
  },

  menu: {
    fontSize: "22px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },

  bioSection: {
    marginTop: "15px",
  },

  bio: {
    color: "#444",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
  },

  resumeBtn: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
};
