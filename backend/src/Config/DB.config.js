import mongoose from "mongoose";
import config from "./Env.config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_CONN_STR);
    console.log("DB connected !!");
  } catch (error) {
    console.log("DB not Connected", error);
  }
};

export default connectDB;
