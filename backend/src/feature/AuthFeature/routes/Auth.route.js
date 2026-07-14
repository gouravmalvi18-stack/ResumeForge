import { Router } from "express";
const router = Router();

//controller
import { RegisterController } from "../controllers/Auth.controller.js";

/**
 * @route POST api/auth/register
 * @description Create User
 * @access public
 */
router.post("/register", RegisterController);

export default router;
