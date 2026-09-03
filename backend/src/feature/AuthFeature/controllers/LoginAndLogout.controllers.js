import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

import config from "../../../Configuration/Env.config.js";

//model
import AuthModel from "../model/Auth.model.js";
import SessionModel from "../model/Session.model.js";
import TokoneBlacklistModel from "../model/TokenBlacklisting.model.js";

/**
 * @name LoginController
 * @description Login a User using email and password and in res send the refresh token and access token
 * @access public
 */

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const RegisterUser = await AuthModel.findOne({ email });

    if (!RegisterUser) {
      return res.status(401).json({
        message: "User is not register , or  Invalid email ",
      });
    }

    if (!RegisterUser.isVerified) {
      return res.status(401).json({
        message: "User is not verified , please verify your email",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      RegisterUser.password,
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const RefreshToken = jwt.sign(
      {
        id: RegisterUser._id,
        email: RegisterUser.email,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    const RefreshTokenHash = crypto
      .createHash("sha256")
      .update(RefreshToken)
      .digest("hex");

    const oldSession = await SessionModel.findOne({
      userid: RegisterUser._id,
      revoked: true,
      ip: req.ip,
    });

    if (oldSession) {
      await oldSession.updateOne({
        revoked: false,
        refreshtokenhash: RefreshTokenHash,
      });

      const AccessToken = jwt.sign(
        {
          id: RegisterUser._id,
          email: RegisterUser.email,
          sessionid: oldSession._id,
        },
        config.JWT_SECRET,
        {
          expiresIn: "30m",
        },
      );

      res.cookie("refreshtoken", RefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({
        message: "User Login Successfully",
        accessToken: AccessToken,
        AuthUser: RegisterUser,
      });
    }

    const Session = await SessionModel.create({
      userid: RegisterUser._id,
      refreshtokenhash: RefreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const AccessToken = jwt.sign(
      {
        id: RegisterUser._id,
        email: RegisterUser.email,
        sessionid: Session._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "30min",
      },
    );

    res.cookie("refreshtoken", RefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "User Login Successfully",
      accessToken: AccessToken,
      AuthUser: RegisterUser,
    });
  } catch (error) {
    res.status(500).json({
      message: `LoginController ERR :: ${error}`,
    });
  }
};

/**
 * @name LogoutController
 * @description logout a user from single device
 * @access public
 */
export async function LogoutController(req, res) {
  try {
    const { refreshtoken } = req.cookies;

    if (!refreshtoken) {
      return res.status(400).json({
        message: "Refresh token is required",
      });
    }
    const decoded = jwt.verify(refreshtoken, config.JWT_SECRET);

    const refreshtokenhash = crypto
      .createHash("sha256")
      .update(refreshtoken)
      .digest("hex");

    const Session = await SessionModel.findOne({
      refreshtokenhash,
      revoked: false,
    });

    if (!Session) {
      return res.status(400).json({
        message:
          "User already logged out or session not found, Please login again!!",
      });
    }

    Session.revoked = true;
    await Session.save();

    // blacklisted a RefreshToken
    await TokoneBlacklistModel.create({
      token: refreshtokenhash,
    });

    res.clearCookie("refreshtoken");

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `LogoutController ERR :: ${error}`,
    });
  }
}

/**
 * @name LogoutAlldevicesController
 * @description logout a user from all device
 * @access public
 */
export async function LogoutAlldevicesController(req, res) {
  try {
    const { refreshtoken } = req.cookies;

    if (!refreshtoken) {
      return res.status(400).json({
        message: "Refresh token is required",
      });
    }
    const decoded = await jwt.verify(refreshtoken, config.JWT_SECRET);

    const AllloginUser = await SessionModel.find({
      userid: decoded.id,
      revoked: false,
    });

    if (AllloginUser.length > 0) {
      // use for of for Sequential execution  and map for Parallel execution

      for (const User of AllloginUser) {
        User.revoked = true;
        await User.save();

        const ExpiredRefreshTokens = User.refreshtokenhash;

        // Blacklisting AllRefreshToken
        await TokoneBlacklistModel.create({
          token: ExpiredRefreshTokens,
        });
      }
      res.clearCookie("refreshtoken");
      res.status(200).json({
        message: "User logged out from all device successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `LogoutAlldevicesController ERR :: ${error}`,
    });
  }
}
