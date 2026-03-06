const express = require("express");
const {
  AddEducation,
  DeleteEducation,
  UpdateEducation,
} = require("../controller/educationController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

// Education routes
router.post("/add", AddEducation);
router.delete("/delete/:eduId", DeleteEducation);
router.patch("/update/:eduId", UpdateEducation);

module.exports = router;
