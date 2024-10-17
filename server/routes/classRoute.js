import Router from "express"

import { createClass, loginAdmin, registerAdmin } from "../controllers/classController.js";


const router = Router()

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/create",createClass)


export default router