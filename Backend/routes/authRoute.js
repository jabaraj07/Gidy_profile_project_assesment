const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateProfile,
  UpdateCareer,
  UpdateProfile,
  UpdateSkills,
  getCurrentUser,
  logout,
  UpdateProfileInUser,
} = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post("/register", register);
router.post("/login", login);

router.use(authMiddleware);

router.patch("/profile", upload.single("profileImage"), updateProfile);

router.patch("/career", UpdateCareer);

router.patch(
  "/update-profile",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  UpdateProfileInUser,
);

router.post("/update-skills", UpdateSkills);

router.get("/me", getCurrentUser);

// logout clears the token cookie
router.post("/logout", logout);

module.exports = router;
