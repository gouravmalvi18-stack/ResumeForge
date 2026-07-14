import AuthModel from "../model/Auth.model.js";

export const RegisterController = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: `Register ERR :: ${error}`,
    });
  }
};
