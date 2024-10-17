import Router from "express"

import { createStudent, deleteStudent, loginStudent, registerStudent, updateStudent,  } from "../controllers/studentController.js";

const router = Router()

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/profile", createStudent);
router.put(":/id",updateStudent)
router.delete(":/id", deleteStudent)


export default router