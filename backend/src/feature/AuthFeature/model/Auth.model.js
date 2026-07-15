import { Schema, model } from "mongoose";

const AuthScheme = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: [true, "username is required"],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const AuthModel = model("auths", AuthScheme);
export default AuthModel;
