import { Schema, model } from "mongoose";

const UserFeedbackSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  Userfeedback: {
    type: String,
    required: [true, "feedback is required"],
  },
});

const UserFeedbackModel = model("userfeedbacks", UserFeedbackSchema);
export default UserFeedbackModel;
