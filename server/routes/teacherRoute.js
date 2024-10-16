import Router from "express"

import { registerTeacher } from "../controllers/teacherController.js";

const router = Router()

router.post("/register", registerTeacher);


export default router