import Router from "express"

import { createClass, deleteClass, getAllClasses, loginAdmin, registerAdmin, updateClass } from "../controllers/classController.js";
import { getAllStudents } from "../controllers/studentController.js";


const router = Router()

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/create",createClass)
router.get("", getAllClasses)
router.get("/:id", getAllStudents)
router.put("/:id", updateClass)
router.delete("/:id", deleteClass)


export default router