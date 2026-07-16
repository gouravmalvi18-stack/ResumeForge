import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

import config from "../../../config/Env.config.js";

//model
import AuthModel from "../model/Auth.model.js";
import OtpModel from "../model/Otp.model.js";
import SessionModel from "../model/Session.model.js";

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

    const expriresTime = new Date(Date.now() + 50 * 60 * 1000); //In 5 min

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

    const user = await AuthModel.findByIdAndUpdate(OtpDoc.userid, {
      isVerified: true,
    });

    await OtpModel.deleteOne({
      userid: OtpDoc.userid,
    });

    res.status(200).json({
      message: "Email verified successfully",
      user: {
        email: OtpDoc.email,
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
