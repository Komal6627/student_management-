import Router from "express"

import { loginTeacher, registerTeacher } from "../controllers/teacherController.js";

const router = Router()

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);



export default router