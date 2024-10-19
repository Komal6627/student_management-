import Router from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { createStudentProfile, deleteStudent, getAllStudents, getStudentById, loginStudent, registerStudent, updateStudent,  } from "../controllers/studentController.js";

const router = Router()

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/profile", authMiddleware, createStudentProfile);
router.put("/:id",updateStudent)
router.delete("/:id", deleteStudent)
router.get("",getAllStudents)
router.get("/:id",getStudentById)

export default router