const User=require("../models/userModel");

// =========================
// All Students
// =========================

const getAllStudents=(req,res)=>{

    User.getAllStudents((err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// =========================
// Student Details
// =========================

const getStudentDetails=(req,res)=>{

    const {id}=req.params;

    User.getStudentDetails(id,(err,student)=>{

        if(err){
            return res.status(500).json(err);
        }

        if(student.length===0){

            return res.status(404).json({
                message:"Student not found"
            });

        }

        User.getStudentQuizHistory(id,(err,history)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({

                student:student[0],
                history

            });

        });

    });

};

module.exports={
    getAllStudents,
    getStudentDetails
};