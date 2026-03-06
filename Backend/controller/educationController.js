const user = require("../models/User");

exports.AddEducation = async (req, res) => {
  try {
    const UserId = req.user.id;

    const {
      collegeName,
      degree,
      fieldOfStudy,
      location,
      dateOfJoining,
      dateOfCompletion,
      currentlyStudying,
    } = req.body;

    // Required validation
    if (!collegeName || !degree || !fieldOfStudy || !dateOfJoining) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    if (currentlyStudying === false) {
      if (!dateOfCompletion) {
        return res.status(400).json({
          message: "Date of completion is required when not currently studying",
        });
      }
      if (dateOfJoining > dateOfCompletion) {
        return res.status(400).json({
          message: "Date of Joining cannot be after Date of Completion",
        });
      }
    }

    const educationData = {
      collegeName,
      degree,
      fieldOfStudy,
      location,
      dateOfJoining,
      currentlyStudying: currentlyStudying || false,
    };

    if (!currentlyStudying && dateOfCompletion) {
      educationData.dateOfCompletion = dateOfCompletion;
    }

    const updatedUser = await user.findByIdAndUpdate(
      UserId.id,
      { $push: { education: educationData } },
      { returnDocument: "after" },
    );

    res.status(200).json({
      message: "Education added successfully",
      education: updatedUser.education,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.DeleteEducation = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { eduId } = req.params;

    const UpdateDetails = await user.findByIdAndUpdate(
      UserId.id,
      { $pull: { education: { _id: eduId } } },
      { returnDocument: "after" },
    );
    res.status(200).json({
      message: "Education removed",
      education: UpdateDetails.education,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.UpdateEducation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eduId } = req.params;

    const { currentlyStudying } = req.body;

    const allowedFields = [
      "collegeName",
      "degree",
      "fieldOfStudy",
      "location",
      "dateOfJoining",
      "dateOfCompletion",
      "currentlyStudying",
    ];

    const updateFields = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateFields[`education.$.${field}`] = req.body[field];
      }
    });

    // Important logic
    if (currentlyStudying === true) {
      updateFields["education.$.dateOfCompletion"] = null;
    }

    const updatedUser = await user.findOneAndUpdate(
      { _id: userId.id, "education._id": eduId },
      { $set: updateFields },
      { returnDocument: "after" },
    );

    res.status(200).json({
      message: "Education updated successfully",
      education: updatedUser.education,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
