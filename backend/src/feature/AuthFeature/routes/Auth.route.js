import { Router } from "express";
const router = Router();

//controller
import {
  RegisterController,
  VerifyController,
  LoginController,
} from "../controllers/Auth.controller.js";

/**
 * @route POST api/auth/register
 * @description Create User
 * @access public
 */
router.post("/register", RegisterController);

/**
 * @route GET api/auth/verify-email
 * @description Verify User's email
 * @access public
 */
router.get("/verify-email", VerifyController);

router.post("/login", LoginController);

export default router;
