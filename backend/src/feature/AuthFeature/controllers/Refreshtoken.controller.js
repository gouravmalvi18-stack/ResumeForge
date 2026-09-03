import jwt from "jsonwebtoken";
import crypto from "crypto";

import config from "../../../Configuration/Env.config.js";

//model
import SessionModel from "../model/Session.model.js";
import TokoneBlacklistModel from "../model/TokenBlacklisting.model.js";

/**
 * @name RefreshTokenController
 * @description Grant a new access token using the refresh token stored in the cookie.
 * @access private
 */
export const RefreshTokenController = async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;

    if (!refreshtoken) {
      return res.status(400).json({
        message: "token is required",
      });
    }

    const decoded = jwt.verify(refreshtoken, config.JWT_SECRET);

    const refreshtokenhash = crypto
      .createHash("sha256")
      .update(refreshtoken)
      .digest("hex");

    //checking if the token is blacklisted or not
    const isTokenBlacklisted = await TokoneBlacklistModel.findOne({
      token: refreshtokenhash,
    });
    if (isTokenBlacklisted) {
      return res.status(401).json({
        message: "Token is blacklisted, Please login again!!",
      });
    }

    const Session = await SessionModel.findOne({
      refreshtokenhash,
      revoked: false,
    });

    if (!Session) {
      return res.status(400).json({
        message: "User already logged out, Please login again!!",
      });
    }

    const NewAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        sessionid: Session._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "30m",
      },
    );

    //add the old refresh token into  blacklist table
    const InvalidRefreshtoken = await TokoneBlacklistModel.create({
      token: refreshtokenhash,
    });

    const NewRefreshtoken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const NewRefreshtokenhash = crypto
      .createHash("sha256")
      .update(NewRefreshtoken)
      .digest("hex");

    Session.refreshtokenhash = NewRefreshtokenhash;
    await Session.save();

    res.cookie("refreshtoken", NewRefreshtoken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "NewAccess Token Generated Successfully",
      accessToken: NewAccessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: `RefreshTokenController ERR :: ${error}`,
    });
  }
};
