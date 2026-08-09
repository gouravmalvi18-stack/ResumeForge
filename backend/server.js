import app from "./src/app.js";
import connectDB from "./src/Config/DB.config.js";
import config from "./src/Config/Env.config.js";
const port = config.PORT || 8000;

import {
  resume,
  selfDescription,
  jobDescription,
} from "./src/feature/AiFeture/temp.js";
import generateAiReport from "./src/feature/AiFeture/services/AiService.js";

//DateBase Connection
connectDB();

generateAiReport({ jobDescription, selfDescription, resume });
app.listen(port, () => {
  console.log("Server Up !!!");
});
