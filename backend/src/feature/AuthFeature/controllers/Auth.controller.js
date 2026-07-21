import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

import config from "../../../config/Env.config.js";

//model
import AuthModel from "../model/Auth.model.js";
import OtpModel from "../model/Otp.model.js";
import SessionModel from "../model/Session.model.js";
import TokoneBlacklistModel from "../model/TokenBlacklisting.model.js";

//services
import { genrateOtp, getOtpHtml } from "../utils/Email.utils.js";
import { sendOtp } from "../services/Email.service.js";

/**
 * @name RegisterController
 * @description Register a User and send otp for verfication
 * @access public
 */
export const RegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const ExistingUser = await AuthModel.findOne({ email });

    if (ExistingUser) {
      return res.status(400).json({
        message: "Email already exist, Try with different Email",
      });
    }

    const passworHash = await bcrypt.hash(password, 10);

    const NewUser = await AuthModel.create({
      username,
      email,
      password: passworHash,
    });

    const otp = genrateOtp();

    const html = getOtpHtml(otp);
    const otphash = crypto.createHash("sha256").update(otp).digest("hex");

    const DeletePreviousOtp = await OtpModel.deleteOne({ email });

    const expriresTime = new Date(Date.now() + 5 * 60 * 1000); //In 5 min

    const OtpEntry = await OtpModel.create({
      userid: NewUser._id,
      email: NewUser.email,
      otphash,
      expiresAt: expriresTime,
    });

    await sendOtp(
      NewUser.email,
      "OTP Verification",
      `Your OTP is ${otp}`,
      html,
    );

    res.status(201).json({
      message: "User Register Sucessfully",
      NewUser,
    });
  } catch (error) {
    res.status(500).json({
      message: `Register ERR :: ${error}`,
    });
  }
};

/**
 * @name VerifyEmailController
 * @description verify the user with otp and update the user isVerified field to trues
 * @access public
 */
export const VerifyEmailController = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!otp || !email) {
      return res.status(400).json({
        message: "Emai and OTP bot are required",
      });
    }

    const OtpDoc = await OtpModel.findOne({ email });

    if (!OtpDoc) {
      return res.status(404).json({
        message: "OTP not found",
      });
    }

    const currentTime = new Date();

    if (currentTime > OtpDoc.expiresAt) {
      await OtpModel.deleteOne({ email });
      await AuthModel.deleteOne({ email });
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    const otpHash = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");

    if (otpHash !== OtpDoc.otphash) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const user = await AuthModel.findByIdAndUpdate(
      OtpDoc.userid,
      {
        isVerified: true,
      },
      { new: true },
    );

    await OtpModel.deleteOne({
      userid: OtpDoc.userid,
    });

    res.status(200).json({
      message: "Email verified successfully",
      user: {
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `Verify-Email ERR :: ${error}`,
    });
  }
};

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
      return res.status(401).json({
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
          expiresIn: "15m",
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
        expiresIn: "15m",
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
    });
  } catch (error) {
    res.status(500).json({
      message: `Login ERR :: ${error}`,
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
    const decoded = await jwt.verify(refreshtoken, config.JWT_SECRET);

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
      message: `Logout ERR :: ${error}`,
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
      message: `LogoutAlldevice ERR :: ${error}`,
    });
  }
}

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
        id: decoded._id,
        email: decoded.email,
        sessionid: Session._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "15m",
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
      NewAccessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: `RefreshToken ERR :: ${error}`,
    });
  }
};
