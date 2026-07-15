import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

//model
import AuthModel from "../model/Auth.model.js";
import OtpModel from "../model/Otp.model.js";

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
 * @name VerifyController
 * @description Verify User's email using OTP
 * @access public
 */
export const VerifyController = async (req, res) => {
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
      message: `Register ERR :: ${error}`,
    });
  }
};

export const LoginController = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: `Register ERR :: ${error}`,
    });
  }
};
