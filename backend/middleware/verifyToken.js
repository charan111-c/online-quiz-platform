const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.cookies?.token;

  // Check Authorization header if cookie is missing
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;

    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Access Denied. Please login first.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or Expired Token",
    });
  }
};

module.exports = verifyToken;