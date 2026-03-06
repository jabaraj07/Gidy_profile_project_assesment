// const multer = require('multer');

// // Use a temporary folder
// const upload = multer({
//   dest: 'tmp/', // this will create temp files in 'tmp' folder
//   limits: { fileSize: 5 * 1024 * 1024 },
//   //   fileFilter: (req, file, cb) => {
//   //   if (file.mimetype === "application/pdf") {
//   //     cb(null, true);
//   //   } else {
//   //     cb(new Error("Only PDF files allowed"), false);
//   //   }
//   // }
// });

// module.exports = upload;








const multer = require("multer");
const path = require("path");

// Store files temporarily in 'tmp/' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

module.exports = upload;