import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("Port Not defined in env variable");
}
if (!process.env.MONGODB_CONN_STR) {
  throw new Error("MONGODB_CONN_STR Not defined in env variable");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET Not defined in env variable");
}
if (!process.env.EMAIL_USER) {
  throw new Error("JWT_SECRET Not defined in env variable");
}
if (!process.env.EMAIL_PASS) {
  throw new Error("JWT_SECRET Not defined in env variable");
}

const config = {
  PORT: process.env.PORT,
  MONGODB_CONN_STR: process.env.MONGODB_CONN_STR,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};
export default config;
