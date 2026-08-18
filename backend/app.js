const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/db");

// ================= ROUTES =================
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes"); // NEW

// ================= MIDDLEWARE =================
const verifyToken = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

// ================= API ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes); // NEW

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
  res.send("Online Quiz Backend is Running 🚀");
});

// ================= PROTECTED ROUTE =================
app.get("/api/profile", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to your profile",
    user: req.user,
  });
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});