import UserFeedbackModel from "../model/UserFeedback.model.js";

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

    res.status(200).json({
      message:
        "Thank you for your feedback! We appreciate your input and we will use it to improve our service.",
    });
  } catch (error) {
    res.status(500).json({
      message: `UserFeedbackController ERR :: ${error}`,
    });
  }
};
