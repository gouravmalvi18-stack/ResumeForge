import { Router } from "express";
const router = Router();

//controller
import {
  RegisterController,
  VerifyEmailController,
  LoginController,
  RefreshTokenController,
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
router.get("/verify-email", VerifyEmailController);

/**
 * @route POST api/auth/login
 * @description Login a user
 * @access public
 */
router.post("/login", LoginController);

/**
 * @route GET api/auth/refreshtoken
 * @description  Get a new access token using the refresh token
 * @access private
 */
router.get("/refreshtoken", RefreshTokenController);

export default router;
