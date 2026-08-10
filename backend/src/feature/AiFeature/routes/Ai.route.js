import { Router } from "express";
const router = Router();

//controller
import { CreateReportController } from "../controller/Ai.controller.js";

//middleware
import fileMiddleware from "../middleware/file.middleware.js";

/**
 * @route POST api/aiservice/create-report
 * @description Create a new report based on the user's resume, self-description, and job description
 * @access private
 */
router.post(
  "/create-report",
  fileMiddleware.single("resume"),
  CreateReportController,
);

export default router;
