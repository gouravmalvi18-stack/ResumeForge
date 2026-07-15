import mongoose, { Schema, model } from "mongoose";

const SessionScheme = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: [true, "userid is required"],
    },
    refreshtokonhash: {
      type: String,
      required: [true, "refreshtokon is required"],
    },
    ip: {
      type: String,
      required: [true, "ip is required"],
    },
    userAgent: {
      type: String,
      required: [true, "userAgent is required"],
    },
    revoked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const SessionModel = model("session", SessionScheme);
export default SessionModel;
