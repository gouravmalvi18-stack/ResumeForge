//model
import AuthModel from "../model/Auth.model.js";

/**
 * @name GetMeController
 * @description   It will fetch the authenticated user information
 * @access private
 */
export const GetMeController = async (req, res) => {
  try {
    const { id } = req.user;

    const AuthUser = await AuthModel.findById(id);

    if (!AuthUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Authenticated user fetched successfully",
      AuthUser,
    });
  } catch (error) {
    res.status(500).json({
      message: `GetMeController ERR :: ${error}`,
    });
  }
};
