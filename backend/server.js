import app from "./src/app.js";
import connectDB from "./src/Configuration/DB.config.js";
import config from "./src/Configuration/Env.config.js";

//DateBase Connection
connectDB();

if (process.env.NODE_ENV !== "production") {
  const port = config.PORT || 8000;
  app.listen(port, () => {
    console.log("Server Up !!!");
  });
}

export default app;
