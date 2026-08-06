import { Router } from "express";
const router = Router();

//controllers
import {
  RegisterController,
  VerifyEmailController,
  LoginController,
  RefreshTokenController,
  LogoutController,
  LogoutAlldevicesController,
  ResendOtpController,
} from "../controllers/Auth.controller.js";

/**
 * @route POST api/auth/register
 * @description Create User
 * @access public
 */
router.post("/register", RegisterController);

/**
 * @route PATCH api/auth/verify-email
 * @description Verify User's email
 * @access public
 */
router.patch("/verify-email", VerifyEmailController);

/**
 * @route POST api/auth/resendOtp
 * @description Create a new Otp
 * @access public
 */
router.post("/resendOtp", ResendOtpController);

/**
 * @route POST api/auth/login
 * @description Login a user
 * @access public
 */
router.post("/login", LoginController);

/**
 * @route POST api/auth/logout
 * @description logout a User
 * @access public
 */
router.post("/logout", LogoutController);

/**
 * @route POST api/auth/logout-alldevices
 * @description logout a User from all devices
 * @access public
 */
router.post("/logout-alldevices", LogoutAlldevicesController);

/**
 * @route POST api/auth/refreshtoken
 * @description  Get a new access token using the refresh token
 * @access private
 */
router.post("/refreshtoken", RefreshTokenController);

export default router;
