const user = require("../models/User");


exports.AddExperience = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { role, companyName, location, dateOfJoining, currentlyWorking } =
      req.body;

    if (!role || !companyName) {
      return res
        .status(400)
        .json({ message: "Role and Company Name are Required" });
    }
    const experienceData = {
      role,
      companyName,
      location,
      currentlyWorking: currentlyWorking || false,
    };

    if (dateOfJoining) {
      experienceData.dateOfJoining = dateOfJoining;
    }
    if (currentlyWorking === false && req.body.dateOfLeaving) {
      experienceData.dateOfLeaving = req.body.dateOfLeaving;
    }

    const updateUser = await user.findByIdAndUpdate(
      UserId.id,
      { $push: { experience: experienceData } },
      { returnDocument: "after" },
    );
    res.status(200).json({
      message: "Experience added successfully",
      experience: updateUser.experience,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.UpdateExperience = async (req, res) => {
  try {
    const { ExpId } = req.params;
    const UserId = req.user.id;

    const allowedFields = [
      "role",
      "companyName",
      "location",
      "dateOfJoining",
      "currentlyWorking",
    ];

    const updateFields = {};

    allowedFields.forEach((field) => {
      // skip empty strings for date fields
      if (req.body[field] !== undefined) {
        const val = req.body[field];
        if ((field === "dateOfJoining" || field === "dateOfLeaving") && !val) {
          // do not set blank dates
        } else {
          updateFields[`experience.$.${field}`] = val;
        }
      }
    });

    if (req.body.currentlyWorking !== undefined) {
      if (req.body.currentlyWorking === true) {
        updateFields["experience.$.dateOfLeaving"] = null;
      } else if (req.body.dateOfLeaving !== undefined) {
        updateFields["experience.$.dateOfLeaving"] = req.body.dateOfLeaving;
      }
    }

    const updatedExperience = await user.findOneAndUpdate(
      { _id: UserId.id, "experience._id": ExpId },
      { $set: updateFields },
      { returnDocument: "after" },
    );

    res.status(200).json({
      message: "Education updated successfully",
      education: updatedExperience.experience,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.DeleteExperience = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { ExpId } = req.params;

    // use findOneAndUpdate with $pull - findOneAndDelete removes the whole user
    const updatedUser = await user.findOneAndUpdate(
      { _id: UserId.id },
      { $pull: { experience: { _id: ExpId } } },
      { returnDocument: "after" }
    );

    res.status(200).json({
      message: "Experience removed",
      experience: updatedUser.experience,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};