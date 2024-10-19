import Router from "express"

import { assignClassToTeacher, deleteTeacher, getTeacherById, getTeachers, loginTeacher, registerTeacher, updateTeacher } from "../controllers/teacherController.js";

const router = Router()

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.post("/assign-class/:id", assignClassToTeacher)
router.get("", getTeachers)
router.get("/:id", getTeacherById)
router.put("/:id", updateTeacher)
router.delete("/:id", deleteTeacher)
export default router
