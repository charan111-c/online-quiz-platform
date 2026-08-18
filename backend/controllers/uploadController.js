const XLSX = require("xlsx");
const db = require("../config/db");
const fs = require("fs");

const uploadQuestions = (req, res) => {
  console.log("========== UPLOAD START ==========");

  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No Excel file uploaded.",
      });
    }

    const { quizId } = req.body;

    if (!quizId) {
      return res.status(400).json({
        success: false,
        message: "Quiz ID is required.",
      });
    }

    console.log("File Path:", req.file.path);
    console.log("Exists:", fs.existsSync(req.file.path));

    if (!fs.existsSync(req.file.path)) {
      return res.status(500).json({
        success: false,
        message: "Uploaded file not found.",
      });
    }

    const workbook = XLSX.readFile(req.file.path);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log(rows);

    if (rows.length === 0) {
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        success: false,
        message: "Excel file is empty.",
      });
    }

    const values = [];

    rows.forEach((row) => {
      if (
        row.question &&
        row.option1 &&
        row.option2 &&
        row.option3 &&
        row.option4 &&
        row.correctOption
      ) {
        values.push([
          Number(quizId),
          row.question,
          row.option1,
          row.option2,
          row.option3,
          row.option4,
          Number(row.correctOption),
        ]);
      }
    });

    if (values.length === 0) {
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        success: false,
        message: "No valid questions found.",
      });
    }

    const sql = `
      INSERT INTO questions
      (quiz_id, question, option1, option2, option3, option4, correct_option)
      VALUES ?
    `;

    db.query(sql, [values], (err, result) => {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: err.sqlMessage || err.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: `${result.affectedRows} Questions Uploaded Successfully`,
      });
    });
  } catch (err) {
    console.log(err);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  uploadQuestions,
};