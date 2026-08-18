const express=require("express");
const router=express.Router();

const verifyToken=require("../middleware/authMiddleware");

const {

    getAllStudents,
    getStudentDetails

}=require("../controllers/userController");

// All Students

router.get(
    "/students",
    verifyToken,
    getAllStudents
);

// Student Details

router.get(
    "/students/:id",
    verifyToken,
    getStudentDetails
);

module.exports=router;