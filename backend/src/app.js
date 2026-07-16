import express from "express";
import cookieParser from "cookie-parser";
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

/**@import routes */
import AuthRouter from "./feature/AuthFeature/routes/Auth.route.js";

// use routes
app.use("/api/auth", AuthRouter);

export default app;
