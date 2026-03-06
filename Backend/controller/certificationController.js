const user = require("../models/User");

exports.AddCertification = async (req, res) => {
  try {
    const UserId = req.user.id;
    const {
      name,
      provider,
      certificateUrl,
      certificateId,
      issueDate,
      expiryDate,
      description,
    } = req.body;

    if (!name || !provider) {
      return res
        .status(400)
        .json({ message: "Name and provider are required" });
    }

    const certificationData = {
      name,
      provider,
    };

    if (certificateUrl) {
      certificationData.certificateUrl = certificateUrl;
    }
    if (certificateId) {
      certificationData.certificateId = certificateId;
    }
    if (issueDate) {
      certificationData.issueDate = issueDate;
    }
    if (expiryDate) {
      certificationData.expiryDate = expiryDate;
    }
    if (description) {
      certificationData.description = description;
    }

    if (expiryDate && expiryDate < issueDate) {
      return res.status(400).json({
        message: "Expiry date cannot be before issue date",
      });
    }

    const AddedCertification = await user.findByIdAndUpdate(
      UserId.id,
      { $push: { certifications: certificationData } },
      { returnDocument: "after" },
    );

    res.status(200).json({
      message: "Certification Added Successfully",
      certifications: AddedCertification.certifications,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.DeleteCertification = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { certId } = req.params;

    const DeleteCertificationDetails = await user.findByIdAndUpdate(
      UserId.id,
      { $pull: { certifications: { _id: certId } } },
      { returnDocument: "after" },
    );

    res.status(200).json({
      message: "Certification Deleted Successfully",
      certification: DeleteCertificationDetails.certifications,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.UpdateCertification = async (req, res) => {
  try {
    const userId = req.user.id;
    const { certId } = req.params;

    const updateFields = {};

    Object.keys(req.body).forEach((key) => {
      updateFields[`certifications.$.${key}`] = req.body[key];
    });

    const updatedUser = await user.findOneAndUpdate(
      { _id: userId.id, "certifications._id": certId },
      { $set: updateFields },
      { returnDocument: "after" },
    );

    res.status(200).json({
      message: "Certification updated",
      certifications: updatedUser.certifications,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
