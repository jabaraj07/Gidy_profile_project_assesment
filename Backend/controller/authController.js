const { generateToken } = require("../config/jwt");
const user = require("../models/User");
const bcrypt = require("bcrypt");
const calculateProfileCompletion = require("../utils/profileCompletion");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // console.log("User Details : ", { name, email, password });

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ExistingUser = await user.findOne({ email });

    if (ExistingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashPassword = await bcrypt.hash(password, 11);

    const Data = new user({ name, email, password: hashPassword });
    await Data.save();

    return res.status(201).json({ message: "User Registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ExistingUser = await user.findOne({ email });
    if (!ExistingUser) {
      return res.status(401).json({ message: "User Not Found" });
    }

    const passwordMatch = await bcrypt.compare(password, ExistingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const UserToken = generateToken({
      id: ExistingUser._id,
      email: ExistingUser.email,
    });
    if (!UserToken) {
      return res.status(500).json({ message: "Token Generation Failed" });
    }

    res.cookie("token", UserToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: Number(process.env.TOKEN_COOKIE_EXPIRES),
    });

    const userObj = ExistingUser.toObject();
    delete userObj.password;
    return res.status(200).json({
      message: "Login Successful",
      User: userObj,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lastName, whatBestDescribeYou } = req.body;

    let imageUrl;
    let publicId;
    if (req.file) {
      const filePath = req.file.path.replace(/\\/g, "/");
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "profile_images",
        });

        imageUrl = result.secure_url;
        publicId = result.public_id;
      } catch (err) {
        console.error("Cloudinary upload error:", err);
      } finally {
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) console.error("Temp file delete error:", err);
          });
        }
      }
    }

    const Existinguser = await user.findById(userId.id);

    const updateData = {
      profile: {
        lastName: lastName || Existinguser.profile.lastName,
        whatBestDescribeYou:
          whatBestDescribeYou || Existinguser.profile.whatBestDescribeYou,
      },
      isProfileComplete: true,
    };
    if (imageUrl) {
      updateData.profile.profileImage = imageUrl;
      updateData.profile.profileImagePublicId = publicId;
    }

    const userData = await user.findByIdAndUpdate(userId.id, updateData, {
      returnDocument: "after",
    });

    res.status(200).json({ message: "Profile Updated Successfully", userData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.UpdateProfileInUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lastName, whatBestDescribeYou, location, bio, name } = req.body;

    let profileImageUrl;
    let resumeUrl;
    let resumePublicId;
    let publicId;
    let profileImagePublicId;

    if (req.files?.profileImage?.length) {
      const filePath = req.files.profileImage[0].path.replace(/\\/g, "/");
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "profile_images",
        });
        profileImageUrl = result.secure_url;
        publicId = result.public_id;
      } catch (error) {
        console.error("Cloudinary upload error:", err);
      } finally {
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) console.error("Temp file delete error:", err);
          });
        }
      }
    }

    if (req.files?.resume?.length) {
      const filePath = req.files.resume[0].path.replace(/\\/g, "/");
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "resumes",
          resource_type: "raw",
        });
        resumeUrl = result.secure_url;
        resumePublicId = result.public_id;
      } catch (error) {
        console.error("Cloudinary upload error:", err);
      } finally {
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) console.error("Temp file delete error:", err);
          });
        }
      }
    }

    // Find existing user
    const existingUser = await user.findById(userId.id);

    const oldImagePublicId = existingUser.profile.profileImagePublicId;
    const oldResumePublicId = existingUser.profile.resumePublicId;

    // Otherwise, keep existing URL
    profileImageUrl = profileImageUrl || existingUser.profile.profileImage;
    profileImagePublicId =
      publicId || existingUser.profile.profileImagePublicId;

    resumeUrl = resumeUrl || existingUser.profile.resume;
    resumePublicId = resumePublicId || existingUser.profile.resumePublicId;

    // Prepare update
    const updateData = {
      name: name || existingUser.name,
      profile: {
        lastName: lastName || existingUser.profile.lastName,
        whatBestDescribeYou:
          whatBestDescribeYou || existingUser.profile.whatBestDescribeYou,
        location: location || existingUser.profile.location,
        bio: bio || existingUser.profile.bio,
      },
      isProfileComplete: true,
    };

    if (profileImageUrl) updateData.profile.profileImage = profileImageUrl;
    if (profileImagePublicId)
      updateData.profile.profileImagePublicId = profileImagePublicId;
    if (resumePublicId) {
      updateData.profile.resumePublicId = resumePublicId;
    }
    if (resumeUrl) updateData.profile.resume = resumeUrl;

    // Update user
    const userData = await user.findByIdAndUpdate(userId.id, updateData, {
      returnDocument: "after",
    });

    if (oldImagePublicId) {
      await cloudinary.uploader.destroy(oldImagePublicId);
    }

    if (oldResumePublicId) {
      await cloudinary.uploader.destroy(oldResumePublicId,{
        resource_type:"raw"
      });
    }

    res
      .status(200)
      .json({ message: "Profile Updated Successfully", userDetails: userData });
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.UpdateCareer = async (req, res) => {
  try {
    const { longTermAspiration, aspirationalField, inspiration, currentAim } =
      req.body;
    const userId = req.user.id;

    if (
      !longTermAspiration ||
      !aspirationalField ||
      !inspiration ||
      !currentAim
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userData = await user.findById(userId.id).select("-password");

    // console.log(userData)
    const updateData = {
      careerGoals: {
        longTermAspiration:
          longTermAspiration || userData.careerGoals.longTermAspiration,
        aspirationalField:
          aspirationalField || userData.careerGoals.aspirationalField,
        inspiration: inspiration || userData.careerGoals.inspiration,
        currentAim: currentAim || userData.careerGoals.currentAim,
      },
    };
    const updatedUser = await user.findByIdAndUpdate(userId.id, updateData, {
      returnDocument: "after",
    });
    res.json({
      message: "Career goals updated successfully",
      Data: userData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.UpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { location, bio } = req.body;

    const updateFields = {};

    if (location) {
      updateFields["profile.location"] = location;
    }

    if (bio) {
      updateFields["profile.bio"] = bio;
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",
        folder: "resumes",
        public_id: req.file.originalname.split(".")[0],
        use_filename: true,
        unique_filename: false,
        format: "pdf",
      });

      updateFields["profile.resume"] = result.secure_url;
    }
    const updatedUser = await user.findByIdAndUpdate(
      userId.id,
      { $set: updateFields },
      { returnDocument: "after" },
    );
    res.status(200).json({
      message: "Profile Updated Successfully",
      userDetails: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.UpdateSkills = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { skills } = req.body;
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res
        .status(400)
        .json({ message: "Skills must be a non-empty array" });
    }
    const updatedUser = await user.findByIdAndUpdate(
      UserId.id,
      { $set: { skills } },
      { returnDocument: "after" },
    );
    res.status(200).json({
      message: "Skills updated successfully",
      userDetails: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.logout = (req, res) => {
  // clear the auth cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

exports.getCurrentUser = async (req, res) => {
  try {
    const UserId = req.user.id;

    const CurrentUser = await user.findById(UserId.id).select("-password");
    if (!CurrentUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const completion = calculateProfileCompletion(CurrentUser);

    res.status(200).json({
      message: "Current user fetched successfully",
      user: CurrentUser,
      profileCompletion: completion.progress,
      sections: completion.sections,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
