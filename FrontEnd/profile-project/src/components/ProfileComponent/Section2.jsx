import React from "react";

const Section2 = ({ user, onEdit }) => {
  const career = user?.careerGoals;

  const isCareerEmpty =
    !career?.longTermAspiration &&
    !career?.aspirationalField &&
    !career?.inspiration &&
    !career?.currentAim;

  return (
    <div>
      <div>
        <h2>Tell us where you want to go </h2>
        {!isCareerEmpty ? (
          <>
            <p>You're Career Vision : {career?.longTermAspiration}</p>
            <p>What you’re growing into right now : {career?.currentAim}</p>
            <p>The space you want to grow in : {career?.aspirationalField}</p>
            <p>Inspired by : {career?.inspiration}</p>
          </>
        ) : (
          <>
            <p>
              Add your career goals and what inspires you. This helps us tailor
              recommendations, learning paths, and opportunities just for you.
            </p>
            <div>
              <button onClick={onEdit}>Add your career goals</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Section2;
