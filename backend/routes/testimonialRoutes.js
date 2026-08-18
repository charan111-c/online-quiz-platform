const express = require("express");
const router = express.Router();

const {
  getTestimonials,
  createTestimonial,
} = require("../controllers/testimonialController");

const verifyToken = require("../middleware/verifyToken");

router.get("/", getTestimonials);

router.post("/", verifyToken, createTestimonial);

module.exports = router;