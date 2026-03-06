const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  AddCertification,
  DeleteCertification,
  UpdateCertification,
} = require("../controller/certificationController");
const router = express.Router();

router.use(authMiddleware);

//certificaton routes
router.post("/add", AddCertification);
router.delete("/delete/:certId", DeleteCertification);
router.patch("/update/:certId", UpdateCertification);

module.exports = router;
