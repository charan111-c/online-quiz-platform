const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

// ==========================
// REGISTER
// ==========================
const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(
      sql,
      [fullName, email, hashedPassword, "STUDENT"],
      (err) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        res.status(201).json({
          message: "User Registered Successfully ✅",
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ==========================
// LOGIN (Student + Admin)
// ==========================
const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database Error",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

// ==========================
// MAKE USER ADMIN
// ==========================
const makeAdmin = (req, res) => {
  const { email } = req.body;

  db.query(
    "UPDATE users SET role='ADMIN' WHERE email=?",
    [email],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database Error",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }

      res.status(200).json({
        message: "User promoted to ADMIN successfully.",
      });
    }
  );
};

// ==========================
// MAKE USER STUDENT
// ==========================
const makeStudent = (req, res) => {
  const { email } = req.body;

  db.query(
    "UPDATE users SET role='STUDENT' WHERE email=?",
    [email],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database Error",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }

      res.status(200).json({
        message: "User changed to STUDENT successfully.",
      });
    }
  );
};

// ==========================
// RESET PASSWORD
// ==========================
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email and New Password are required",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email=?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        if (result.length === 0) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        db.query(
          "UPDATE users SET password=? WHERE email=?",
          [hashedPassword, email],
          (err2) => {
            if (err2) {
              return res.status(500).json({
                message: err2.message,
              });
            }

            res.status(200).json({
              message: "Password changed successfully",
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  makeAdmin,
  makeStudent,
  resetPassword,
};