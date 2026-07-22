import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

/**@import routes */
import AuthRouter from "./feature/AuthFeature/routes/Auth.route.js";

// use routes
app.use("/api/auth", AuthRouter);

export default app;
