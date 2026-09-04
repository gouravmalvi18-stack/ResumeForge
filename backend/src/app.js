import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//middleware
// app.use(     // for normal and local development this will work 
//   cors({
//     origin: process.env.CLIENT_URL,  
//     credentials: true,
//   }),
// );

// for Deployment this need to be used

// CORS Configuration
// CORS — allows only specific origins
const allowedOrigins = [
  process.env.LOCAL_CLIENT_URL, // frontend localhost URL
  process.env.DEPLOY_CLIENT_URL, // frontend deployment URL
].filter(Boolean); // removes undefined if DEPLOY_CLIENT_URL not set yet

const corsOptions = {                      
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.options(/.*/, cors(corsOptions)); // handle preflight requests 
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

/**@import routes */
import AuthRouter from "./feature/AuthFeature/routes/Auth.route.js";
import AiRouter from "./feature/AiFeature/routes/Ai.route.js";
import UserFeedbackRouter from "./feature/AuthFeature/routes/UserFeedback.route.js";

// use routes
app.use("/api/auth", AuthRouter);
app.use("/api/aiservice", AiRouter);
app.use("/api", UserFeedbackRouter);

export default app;
