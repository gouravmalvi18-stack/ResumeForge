import multer, { memoryStorage } from "multer";

const fileMiddleware = multer({
  storage: memoryStorage(),
  limits: 3 * 1024 * 1024, // 3mb
});

export default fileMiddleware;
