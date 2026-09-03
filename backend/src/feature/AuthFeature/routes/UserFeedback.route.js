import { Router } from "express";
const router = Router();

import { UserFeedbackController } from "../controllers/UserFeedBack.controller.js";

router.post("/contactus", UserFeedbackController);

export default router;
