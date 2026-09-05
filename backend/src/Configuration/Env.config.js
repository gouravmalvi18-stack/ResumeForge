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

if (!process.env.GEMINI_AI_API_KEY) {
  throw new Error("GEMINI_AI_API_KEY Not defined in env variable");
}

if (!process.env.EMAILJS_SERVICE_ID) {
  throw new Error("EMAILJS_SERVICE_ID Not defined in env variable");
}
if (!process.env.EMAILJS_TEMPLATE_ID) {
  throw new Error("EMAILJS_TEMPLATE_ID Not defined in env variable");
}
if (!process.env.EMAILJS_PUBLIC_KEY) {
  throw new Error("EMAILJS_PUBLIC_KEY Not defined in env variable");
}

if (!process.env.EMAILJS_PRIVATE_KEY) {
  throw new Error("EMAILJS_PRIVATE_KEY Not defined in env variable");
}

const config = {
  PORT: process.env.PORT,
  MONGODB_CONN_STR: process.env.MONGODB_CONN_STR,
  JWT_SECRET: process.env.JWT_SECRET,
  GEMINI_AI_API_KEY: process.env.GEMINI_AI_API_KEY,
  EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
  EMAILJS_PRIVATE_KEY: process.env.EMAILJS_PRIVATE_KEY,
};
export default config;
