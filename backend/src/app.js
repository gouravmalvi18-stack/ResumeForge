import express from "express";
const app = express();

//middleware
app.use(express.json());

/**@import routes */
import AuthRouter from "./feature/AuthFeature/routes/Auth.route.js";

// use routes
app.use("/api/auth", AuthRouter);

export default app;
