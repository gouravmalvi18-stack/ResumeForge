import { Router } from "express";
const router = Router();

//controller
import { GenerateAibasedReport } from "../controller/Ai.controller.js";

/**
 * @route POST api/aiservice/create-report
 * @description Create a new report based on the user's resume, self-description, and job description
 * @access private
 */
router.post("/create-report", GenerateAibasedReport);

export default router;
