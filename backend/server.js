import app from "./src/app.js";
import connectDB from "./src/Config/DB.config.js";
import config from "./src/Config/Env.config.js";

// const port = config.PORT || 8000;

connectDB();

app.listen(config.PORT, () => {
  console.log("Server Up !!!");
});
