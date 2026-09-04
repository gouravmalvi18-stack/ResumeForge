import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// 1. Reconstruct __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//middleware
// app.use(     // for normal and local development this will work
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   }),
// );
// CORS Configuration
const allowedOrigins = [
  process.env.LOCAL_CLIENT_URL, // frontend localhost URL
  process.env.DEPLOY_CLIENT_URL, // frontend deployment URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.options(/.*/, cors(corsOptions));
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

// --- PRODUCTION DEPLOYMENT SETTINGS ---
// This must come AFTER all your /api routes
if (process.env.NODE_ENV === "production") {
  // Since this file is in backend/src/, we go up two levels to hit the root, then into frontend/dist
  const frontendDistPath = path.join(__dirname, "../../frontend/dist");

  // Serve the static Vite files
  app.use(express.static(frontendDistPath));

  // Catch-all route for React Router (SPA navigation)
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

export default app;
