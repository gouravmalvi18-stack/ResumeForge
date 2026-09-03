import jwt from "jsonwebtoken";
import config from "../../../Configuration/Env.config.js";

//model
import SessionModel from "../model/Session.model.js";

const AuthTokenCheckMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "User is Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "User is Unauthorized",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const session = await SessionModel.findById(decoded.sessionid);
    const UserlogoutCheck = session.revoked;

    if (!session || UserlogoutCheck) {
      return res.status(401).json({
        message: "User is loggout , please login again",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({
        message: "User is Unauthorized",
      });
    }

    res.status(500).json({
      message: `AuthTokenCheckMiddleware ERR :: ${error}`,
    });
  }
};

export default AuthTokenCheckMiddleware;
