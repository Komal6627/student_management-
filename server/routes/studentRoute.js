import Router from "express"

import { createStudent, deleteStudent, getAllStudents, getStudentById, loginStudent, registerStudent, updateStudent,  } from "../controllers/studentController.js";

const router = Router()

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/profile", createStudent);
router.put("/:id",updateStudent)
router.delete("/:id", deleteStudent)
router.get("",getAllStudents)
router.get("/:id",getStudentById)

export default router