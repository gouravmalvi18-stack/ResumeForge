import { Router } from "express";
const router = Router();

//controller
import {
  CreateReportController,
  GetAllReportController,
  GetReportByIdController,
} from "../controller/Ai.controller.js";

//middleware
import fileMiddleware from "../middleware/file.middleware.js";
import AuthTokenCheckMiddleware from "../../AuthFeature/middlewares/AuthTokenCheck.middleware.js";

/**
 * @route POST api/aiservice/create-report
 * @description Create a new report based on the user's resume, self-description, and job description
 * @access private
 */
router.post(
  "/create-report",
  AuthTokenCheckMiddleware,
  fileMiddleware.single("resume"),
  CreateReportController,
);

/**
 * @route GET api/aiservice/getallreport
 * @description  Get all reports
 * @access private
 */
router.get("/getallreport", AuthTokenCheckMiddleware, GetAllReportController);

/**
 * @route GET api/aiservice/getreport/:id
 * @description  Get report by id
 * @access private
 */
router.get("/getreport/:id", AuthTokenCheckMiddleware, GetReportByIdController);

export default router;
