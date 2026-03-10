import React from "react";
import { FiUploadCloud, FiFile } from "react-icons/fi";
import "./ResumeUpload.css";
const ResumeUpload = ({ register, watch }) => {
  const file = watch("resume");

  return (
    <div className="resume-upload-container">
      <label className="upload-box">
        {file && file.length > 0 ? (
          <>
            <FiFile size={40} color="#6b7280" />
            <p>{file[0].name}</p>
            {/* <button type="button" onClick={() => setValue("resume", null)}>
              Replace Resume
            </button> */}
          </>
        ) : (
          <>
            <FiUploadCloud size={40} color="#9CA3AF" />
            <span className="upload-btn">UPLOAD RESUME</span>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              {...register("resume")}
              className="hidden-input"
            />
          </>
        )}
      </label>
    </div>
  );
};

export default ResumeUpload;
