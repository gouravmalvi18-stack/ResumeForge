import express from "express";
const app = express();

//middleware
app.use(express.json());

//router
//import
import AuthRouter from "./feature/AuthFeature/routes/Auth.route.js";

// user
app.use("api/auth", AuthRouter);

export default app;
