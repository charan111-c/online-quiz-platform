const quizRoutes = require("./routes/quizRoutes");
const verifyToken = require("./middleware/authMiddleware");
const express = require("express");
require("dotenv").config();
require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");

// Use Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Online Quiz Backend is Running 🚀");
});

app.get("/api/profile", verifyToken, (req, res) => {

    res.json({
        message: "Welcome to your profile",
        user: req.user
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.use("/api/quiz", quizRoutes);