import app from "./src/app.js";
import connectDB from "./src/Configuration/DB.config.js";
import config from "./src/Configuration/Env.config.js";
const port = config.PORT || 8000;

//DateBase Connection
connectDB();

app.listen(port, () => {
  console.log("Server Up !!!");
});
