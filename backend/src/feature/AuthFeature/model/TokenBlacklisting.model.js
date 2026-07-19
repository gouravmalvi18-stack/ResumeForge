import { Schema, model } from "mongoose";

const TokoneBlacklistScheme = new Schema(
  {
    token: {
      type: String,
      required: [true, "token is required"],
    },
  },
  { timestamps: true },
);

const TokoneBlacklistModel = model("blacklisttokens", TokoneBlacklistScheme);
export default TokoneBlacklistModel;
