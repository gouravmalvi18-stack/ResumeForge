import UserFeedbackModel from "../model/UserFeedback.model.js";
import { ReceiveFeedbackFromUser } from "../services/Email.service.js";
import { getFeedbackHtml } from "../utils/Email.utils.js";

export const UserFeedbackController = async (req, res) => {
  try {
    const { username, email, Userfeedback } = req.body;

    if (!username || !email || !Userfeedback) {
      return res.status(400).json({
        message: "username, email and feedback are required",
      });
    }

    const feedback = await UserFeedbackModel.create({
      username,
      email,
      Userfeedback,
    });

    const feedbackHtml = getFeedbackHtml(Userfeedback);

    await ReceiveFeedbackFromUser(email, "User Feedback", feedbackHtml);

    res.status(200).json({
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `UserFeedbackController ERR :: ${error}`,
    });
  }
};
