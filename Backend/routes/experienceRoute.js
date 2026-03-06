const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  AddExperience,
  UpdateExperience,
  DeleteExperience,
} = require("../controller/experienceController");

router.use(authMiddleware);

router.post("/add", AddExperience);

router.patch("/Update/:ExpId", UpdateExperience);

router.delete("/delete/:ExpId", DeleteExperience);

module.exports = router;
