const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const verifyToken = require("../middleware/authMiddleware");
const { uploadQuestions } = require("../controllers/uploadController");

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// Upload Route
router.post(
  "/questions",
  verifyToken,
  upload.single("file"),
  uploadQuestions
);

module.exports = router;