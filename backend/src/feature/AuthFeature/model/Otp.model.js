import mongoose, { Schema, model } from "mongoose";

const OtpScheme = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: [true, "Userid is required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    otphash: {
      type: String,
      required: [true, "otp is Required"],
    },
    expiresAt: {
      type: Date,
      required: [true, "expireAt is Required"],
    },
  },
  { timestamps: true },
);

OtpScheme.index({ expriresAt: 1 }, { expireAfterSeconds: 0 });
const OtpModel = model("otps", OtpScheme);
export default OtpModel;
