const db = require("../config/db");

// =========================
// Get All Testimonials
// =========================
const getTestimonials = (req, res) => {
  const sql = "SELECT * FROM testimonials ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.status(200).json(result);
  });
};

// =========================
// Create Testimonial
// =========================
const createTestimonial = (req, res) => {
  const { rating, review } = req.body;

  if (!rating || !review) {
    return res.status(400).json({
      message: "Rating and Review are required",
    });
  }

  const userId = req.user.id;

  db.query(
    "SELECT full_name, role FROM users WHERE id=?",
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database Error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const name = result[0].full_name;
      const role = result[0].role;

      const sql =
        "INSERT INTO testimonials(name, role, rating, review) VALUES(?,?,?,?)";

      db.query(sql, [name, role, rating, review], (err) => {
        if (err) {
          return res.status(500).json({
            message: "Failed to submit testimonial",
          });
        }

        res.status(201).json({
          message: "Thank you for your feedback!",
        });
      });
    }
  );
};

module.exports = {
  getTestimonials,
  createTestimonial,
};